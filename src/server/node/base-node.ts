import {EventEmitter} from "events";

import _ = require("lodash");
import log4js = require("log4js");

import {GeneratorNode} from "./generator-node";
import {tableRegistry} from "../table/table-registry";
import {BaseTable} from "../table/base-table";
import {BaseEntity} from "../../common/entity/base-entity";

export class BaseNode<T extends BaseEntity> extends EventEmitter {

  static EntityClass:typeof BaseEntity;

  parent:BaseNode<BaseEntity>;
  entity:T;
  name:string = "";

  constructor(parent:BaseNode<BaseEntity> = null, entity:T = null) {
    super();
    this.parent = parent;
    this.entity = entity;
    this.log("trace", `Constructing ${(<any>this.constructor).name} object.`);
  }

  get Class():typeof BaseNode {
    return <typeof BaseNode>this.constructor;
  }

  static table():BaseTable<BaseEntity> {
    return tableRegistry.getInstance(this.EntityClass.modelName);
  }

  log(level:string, message:string, ...args:any[]) {
    let logger = log4js.getLogger("system");
    if (this.parent)
      message = `${this.allKeyLabel()} ${message}`;
    switch (level) {
      case "trace":
        return logger.trace(message, ...args);
      case "debug":
        return logger.debug(message, ...args);
      case "info":
        return logger.info(message, ...args);
      case "warn":
        return logger.warn(message, ...args);
      case "error":
        return logger.error(message, ...args);
      case "fatal":
        return logger.fatal(message, ...args);
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

  protected initializeChildren<ChildT extends BaseEntity>(key:string, ChildClass:typeof BaseNode):Promise<void> {
    return this._initializeChildrenCommon<ChildT>(key, ChildClass, childEntity => {
      return new ChildClass(this, childEntity);
    });
  }

  protected initializeChildrenWithGenerator<ChildT extends BaseEntity>(key:string, ChildGenerator:typeof GeneratorNode):Promise<void> {
    let generator = new ChildGenerator(this);
    return this._initializeChildrenCommon<ChildT>(key, ChildGenerator, childEntity => {
      return generator.generate(this, childEntity);
    });
  }

  private _initializeChildrenCommon<ChildT extends BaseEntity>(key:string, ChildClass:typeof BaseNode, genFunc:(entity:ChildT)=>BaseNode<ChildT>):Promise<void> {
    this.log("debug", `Construct child '${key}' objects was started.`);
    _.set(this, key, {});
    return (<BaseTable<ChildT>>ChildClass.table()).find({_id: this.entity._id}).then(entities => {
      for (let entity of entities) {
        _.set(_.get(this, key), entity.name, genFunc(entity));
      }
      this.log("debug", `Construct child '${key}' objects was finished.`);
    });
  }

  protected _keyLabel():string {
    return `${this.name}(${(<any>this.constructor).name})`;
  }

}
