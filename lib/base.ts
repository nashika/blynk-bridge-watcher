import EventEmitter = require("events");

import {Logger} from "log4js";
import _ = require("lodash");

class Base extends EventEmitter {

  protected name:string = "";

  protected _logger:Logger;

  constructor(public parent:Base, config:Object, logger:Logger) {
    super();
    this._logger = this.parent._logger || logger;
    this.name = this._checkConfig(config, "name", "string");
    this.log("trace", `Constructing ${this.constructor.name} object.`);
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

  protected allKeyLabel(...args:string[]):string {
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
        this.log("fatal", "Check config. 'config.#{key}' is undefined.");
        process.exit(1);
      }
    }
    types = _.castArray(types);
    if (types[0] == "in") {
      types.shift();
      for (let type of types) {
        if (target == type) return target;
      }
      this.log("fatal", `Check config. 'config.${key}' value=${target} is unexpected, expects ${JSON.stringify(types)}.`);
    } else {
      for (let type of types) {
        if (type == "array") {
          if (Array.isArray(target)) return target;
        } else {
          if (typeof target == type) return target;
        }
      }
      this.log("fatal", `Check config. 'config.${key}' type=${typeof target} is unexpected, expects ${JSON.stringify(types)}.`);
    }
    process.exit(1);
  }

  protected _initializeChildren(config:Object, key:string, ChildClass:typeof Base):Base {
    this._initializeChildrenCommon(config, key, ChildClass, (ChildClass, childConfig) => {
      return new ChildClass(this, childConfig);
    });
  }

  protected _initializeChildrenWithGenerator(config:Object, key:string, ChildGenerator) {
    let generator = new ChildGenerator(this);
    this._initializeChildrenCommon(config, key, generator, (generator, childConfig) => {
      return generator.generate(this, childConfig);
    });
  }

  protected _initializeChildrenCommon(config:Object, key:string, generator:typeof Base, genFunc) {
    let childrenConfig = this._checkConfig(config, key, "array");
    this.log("debug", `Construct child '${key}' objects was started.`);
    _.set(this, key, {});
    for (let childConfig of childrenConfig) {
      _.set(_.get(this, key), childConfig.name, genFunc(generator, childConfig));
    }
    this.log("debug", `Construct child '${key}' objects was finished.`);
  }

  protected _keyLabel():string {
    return `${this.name}(${this.constructor.name})`;
  }

}

module.exports = Base;
