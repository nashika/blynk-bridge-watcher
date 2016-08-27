import {EventEmitter} from "events";

import log4js = require("log4js");
import {Logger} from "log4js";
import _ = require("lodash");
import {Generator} from "./generator";

export class Base extends EventEmitter {

  public parent:Base;
  public name:string = "";

  protected _logger:Logger;

  constructor(parent:Base, config:Object) {
    super();
    this.parent = parent;
    this._logger = log4js.getLogger("system");
    this.name = this._checkConfig(config, "name", "string");
    this.log("trace", `Constructing ${(<any>this.constructor).name} object.`);
  }

  log(level:string, message:string, ...args:any[]) {
    if (this.parent)
      message = `${this.allKeyLabel()} ${message}`;
    switch (level) {
      case "trace":
        return this._logger.trace(message, ...args);
      case "debug":
        return this._logger.debug(message, ...args);
      case "info":
        return this._logger.info(message, ...args);
      case "warn":
        return this._logger.warn(message, ...args);
      case "error":
        return this._logger.error(message, ...args);
      case "fatal":
        return this._logger.fatal(message, ...args);
    }
  }

  public allKeyLabel(...args:string[]):string {
    if (this.parent)
      return this.parent.allKeyLabel(this._keyLabel(), ...args);
    else
      return `[${args.join('->')}]`;
  }

  protected _checkConfig(config:Object, key:string, types:string|string[], defaultValue:any = undefined):any {
    if ((typeof config != "object") || Array.isArray(config)) {
      this.log("fatal", "Check config. 'config' is not object.");
      process.exit(1);
    }
    let target = _.get(config, key);
    if (typeof target == "undefined") {
      if (defaultValue !== undefined)
        return defaultValue;
      else {
        this.log("fatal", `Check config. 'config.${key}' is undefined.`);
        process.exit(1);
      }
    }
    let arrTypes = _.castArray(types);
    if (arrTypes[0] == "in") {
      arrTypes.shift();
      for (let type of arrTypes) {
        if (target == type) return target;
      }
      this.log("fatal", `Check config. 'config.${key}' value=${target} is unexpected, expects ${JSON.stringify(arrTypes)}.`);
    } else {
      for (let type of arrTypes) {
        if (type == "array") {
          if (Array.isArray(target)) return target;
        } else {
          if (typeof target == type) return target;
        }
      }
      this.log("fatal", `Check config. 'config.${key}' type=${typeof target} is unexpected, expects ${JSON.stringify(arrTypes)}.`);
    }
    process.exit(1);
  }

  protected _initializeChildren<T extends Base>(config:Object, key:string, ChildClass:typeof Base) {
    this._initializeChildrenCommon(config, key, (childConfig) => {
      return new ChildClass(this, childConfig);
    });
  }

  protected _initializeChildrenWithGenerator<T extends Base>(config:Object, key:string, ChildGenerator:typeof Generator) {
    let generator = new ChildGenerator(this);
    this._initializeChildrenCommon(config, key, (childConfig) => {
      return generator.generate(this, childConfig);
    });
  }

  protected _initializeChildrenCommon<T extends Base>(config:Object, key:string, genFunc:(config:Object)=>Base) {
    let childrenConfig = this._checkConfig(config, key, "array");
    this.log("debug", `Construct child '${key}' objects was started.`);
    _.set(this, key, {});
    for (let childConfig of childrenConfig) {
      _.set(_.get(this, key), childConfig.name, genFunc(childConfig));
    }
    this.log("debug", `Construct child '${key}' objects was finished.`);
  }

  protected _keyLabel():string {
    return `${this.name}(${(<any>this.constructor).name})`;
  }

}
