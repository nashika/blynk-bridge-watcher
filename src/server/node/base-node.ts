import {EventEmitter} from "events";

import _ = require("lodash");
import log4js = require("log4js");

import {GeneratorNode} from "./generator-node";
import {tableRegistry} from "../table/table-registry";
import {BaseTable} from "../table/base-table";
import {BaseEntity} from "../../common/entity/base-entity";
import {BaseSwitchEntity} from "../../common/entity/base-switch-entity";

export class BaseNode<T extends BaseEntity> extends EventEmitter {

  static EntityClass:typeof BaseEntity;

  parent:BaseNode<BaseEntity>;
  entity:T;
  name:string = "";

  constructor(parent:BaseNode<BaseEntity> = null, entity:T = null) {
    super();
    this.name = entity.name;
    this.log("trace", `Constructing ${(<any>this.constructor).name} object.`);
  }

  get Class():typeof BaseNode {
    return <typeof BaseNode>this.constructor;
  }

  static table():BaseTable<BaseEntity> {
    return tableRegistry.getInstance(this.EntityClass.params.tableName);
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

  protected initializeChildren<ChildT extends BaseEntity>(key:string, ChildClass:typeof BaseNode):Promise<void> {
    return this._initializeChildrenCommon<ChildT>(key, ChildClass, childEntity => {
      return new ChildClass(this, childEntity);
    });
  }

  protected initializeChildrenWithGenerator<ChildT extends BaseSwitchEntity>(key:string, ChildGenerator:typeof GeneratorNode):Promise<void> {
    let generator = new ChildGenerator(this);
    return this._initializeChildrenCommon<ChildT>(key, ChildGenerator, (childEntity:BaseSwitchEntity) => {
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
