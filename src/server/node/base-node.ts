import {EventEmitter} from "events";
import util = require("util");

import _ = require("lodash");
import log4js = require("log4js");
import pluralize = require("pluralize");
import Socket = SocketIO.Socket;

import {tableRegistry} from "../table/table-registry";
import {BaseTable} from "../table/base-table";
import {BaseEntity} from "../../common/entity/base-entity";
import {MyPromise} from "../../common/util/my-promise";
import {nodeRegistry} from "./node-registry";
import {socketIoServer} from "../socket-io";
import {TSocketIoLogLevel, TSocketIoStatus} from "../../common/util/socket-io-util";

export class BaseNode<T extends BaseEntity> extends EventEmitter {

  static EntityClass: typeof BaseEntity;

  parent: BaseNode<BaseEntity>;
  entity: T;
  name: string = "";
  _status: TSocketIoStatus;

  static table(): BaseTable<BaseEntity> {
    return tableRegistry.getInstance(this.EntityClass.params.tableName);
  }

  static generate(parent: BaseNode<BaseEntity>, entity: BaseEntity): Promise<BaseNode<BaseEntity>> {
    let result: BaseNode<BaseEntity> = new this();
    result.entity = entity;
    result.parent = parent;
    result.name = entity.name;
    result.log("trace", `Generate ${this.name} object was started.`);
    result.status = "processing";
    return Promise.resolve().then(() => {
      return result.initialize();
    }).then(() => {
      result.log("trace", `Generate ${this.name} object was finished.`);
      return result;
    });
  }

  get Class(): typeof BaseNode {
    return <typeof BaseNode>this.constructor;
  }

  get status(): TSocketIoStatus {
    return this._status;
  }

  set status(value: TSocketIoStatus) {
    this._status = value;
    socketIoServer.status(this.entity._id, value);
  }

  protected initialize(): Promise<void> {
    socketIoServer.registerNode(this);
    return MyPromise.eachPromiseSeries(this.Class.EntityClass.params.children, (ChildEntityClass: typeof BaseEntity) => {
      this.log("debug", `Construct child '${ChildEntityClass.params.tableName}' objects was started.`);
      let key = pluralize.plural(ChildEntityClass.params.tableName);
      let childNodes: {[name: string]: BaseNode<BaseEntity>} = {};
      _.set(this, key, childNodes);
      return Promise.resolve().then(() => {
        return tableRegistry.getInstance(ChildEntityClass.params.tableName).find({_parent: this.entity._id});
      }).then(entities => {
        return MyPromise.eachPromiseSeries(entities, (entity: BaseEntity) => {
          return Promise.resolve().then(() => {
            return nodeRegistry.generate(ChildEntityClass.params.tableName, entity, this);
          }).then(node => {
            childNodes[node.name] = node;
          });
        });
      }).then(() => {
        this.log("debug", `Construct child '${key}' objects was finished.`);
      });
    });
  }

  finalize(): Promise<void> {
    this.status = "processing";
    socketIoServer.unregisterNode(this.entity._id);
    return MyPromise.eachPromiseSeries(this.Class.EntityClass.params.children, (ChildEntityClass: typeof BaseEntity) => {
      this.log("debug", `Destruct child '${ChildEntityClass.params.tableName}' objects was started.`);
      let key = pluralize.plural(ChildEntityClass.params.tableName);
      let childNodes = _.get<{[name: string]: BaseNode<BaseEntity>}>(this, key, {});
      return MyPromise.eachPromiseSeries(childNodes, (childNode: BaseNode<BaseEntity>) => {
        return childNode.finalize();
      }).then(() => {
        _.set(this, key, {});
      });
    }).then(() => {
      this.status = "stop";
    });
  }

  log(level: TSocketIoLogLevel, message: string, ...args: any[]) {
    message = util.format(message, ...args);
    socketIoServer.log(this.entity._id, level, message);
    let logger = log4js.getLogger("system");
    if (this.parent)
      message = `${this.allKeyLabel()} ${message}`;
    switch (level) {
      case "trace":
        return logger.trace(message);
      case "debug":
        return logger.debug(message);
      case "info":
        return logger.info(message);
      case "warn":
        return logger.warn(message);
      case "error":
        return logger.error(message);
      case "fatal":
        return logger.fatal(message);
    }
  }

  public allKeyLabel(...args: string[]): string {
    if (this.parent)
      return this.parent.allKeyLabel(this._keyLabel(), ...args);
    else
      return `[${args.join('->')}]`;
  }

  protected _keyLabel(): string {
    return `${this.name}(${(<any>this.constructor).name})`;
  }

}
