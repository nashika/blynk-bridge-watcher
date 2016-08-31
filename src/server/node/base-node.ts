import {EventEmitter} from "events";

import _ = require("lodash");
import log4js = require("log4js");
import pluralize = require("pluralize");

import {tableRegistry} from "../table/table-registry";
import {BaseTable} from "../table/base-table";
import {BaseEntity} from "../../common/entity/base-entity";
import {MyPromise} from "../../common/util/my-promise";
import {nodeRegistry} from "./node-registry";

export class BaseNode<T extends BaseEntity> extends EventEmitter {

  static EntityClass:typeof BaseEntity;

  parent:BaseNode<BaseEntity>;
  entity:T;
  name:string = "";

  get Class():typeof BaseNode {
    return <typeof BaseNode>this.constructor;
  }

  static table():BaseTable<BaseEntity> {
    return tableRegistry.getInstance(this.EntityClass.params.tableName);
  }

  static generate(parent:BaseNode<BaseEntity>, entity:BaseEntity):Promise<BaseNode<BaseEntity>> {
    let result:BaseNode<BaseEntity> = new this();
    result.name = entity.name;
    result.entity = entity;
    result.parent = parent;
    result.log("trace", `Generate ${(<any>this.constructor).name} object was started.`);
    return Promise.resolve().then(() => {
      return result.initialize();
    }).then(() => {
      result.log("trace", `Generate ${(<any>this.constructor).name} object was finished.`);
      return result.initializeChildren();
    }).then(() => {
      return result;
    });
  }

  protected initialize():Promise<void> {
    return Promise.resolve();
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

  protected initializeChildren<ChildT extends BaseEntity>():Promise<void> {
    return MyPromise.eachPromiseSeries(this.Class.EntityClass.params.children, (ChildEntityClass:typeof BaseEntity) => {
      this.log("debug", `Construct child '${ChildEntityClass.params.tableName}' objects was started.`);
      let ChildNodeClass = nodeRegistry.getClass(ChildEntityClass.params.entityName);
      let key = pluralize.plural(ChildEntityClass.params.tableName);
      let childNodes:BaseNode<BaseEntity>[] = [];
      _.set(this, key, childNodes);
      return Promise.resolve().then(() => {
        return tableRegistry.getInstance(ChildEntityClass.params.tableName).find({_parent: this.entity._id});
      }).then(entities => {
        return MyPromise.eachPromiseSeries(entities, (entity:BaseEntity) => {
          return Promise.resolve().then(() => {
            return ChildNodeClass.generate(this, entity);
          }).then(node => {
            childNodes.push(node);
            return;
          });
        });
      }).then(() => {
        this.log("debug", `Construct child '${key}' objects was finished.`);
        return;
      });
    });
    /*return this._initializeChildrenCommon<ChildT>(key, ChildClass, childEntity => {
      return new ChildClass(this, childEntity);
    });*/
  }

  protected _keyLabel():string {
    return `${this.name}(${(<any>this.constructor).name})`;
  }

}
