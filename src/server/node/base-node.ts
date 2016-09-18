import util = require("util");

import _ = require("lodash");
import log4js = require("log4js");
import Socket = SocketIO.Socket;

import {BaseEntity} from "../../common/entity/base-entity";
import {MyPromise} from "../../common/util/my-promise";
import {nodeRegistry} from "./node-registry";
import {TSocketIoLogLevel, TSocketIoStatus} from "../../common/util/socket-io-util";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";
import {NotifierNode} from "./notifier/notifier-node";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

export abstract class BaseNode<T extends BaseEntity> {

  static EntityClass: typeof BaseEntity;

  parent: BaseNode<BaseEntity>;
  entity: T;
  _status: TSocketIoStatus;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
  }

  static generate(parent: BaseNode<BaseEntity>, entity: BaseEntity): Promise<BaseNode<BaseEntity>> {
    let result: BaseNode<BaseEntity> = new (<any>this)();
    result.entity = entity;
    result.parent = parent;
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
    this.socketIoServerService.status(this.entity._id, value);
  }

  protected initialize(): Promise<void> {
    this.socketIoServerService.registerNode(this);
    return MyPromise.eachPromiseSeries(this.Class.EntityClass.params.children, (ChildEntityClass: typeof BaseEntity, key: string) => {
      this.log("debug", `Construct child '${ChildEntityClass.params.tableName}' objects was started.`);
      let childNodes: BaseNode<BaseEntity>[] = [];
      _.set(this, key, childNodes);
      return Promise.resolve().then(() => {
        return this.tableService.find(ChildEntityClass, {_parent: this.entity._id});
      }).then(entities => {
        return MyPromise.eachPromiseSeries(entities, (entity: BaseEntity) => {
          return Promise.resolve().then(() => {
            return nodeRegistry.generate(ChildEntityClass.params.tableName, entity, this);
          }).then(node => {
            childNodes.push(node);
          });
        });
      }).then(() => {
        this.log("debug", `Construct child '${key}' objects was finished.`);
      });
    });
  }

  finalize(): Promise<void> {
    this.status = "processing";
    this.socketIoServerService.unregisterNode(this.entity._id);
    return MyPromise.eachPromiseSeries(this.Class.EntityClass.params.children, (ChildEntityClass: typeof BaseEntity, key: string) => {
      this.log("debug", `Destruct child '${ChildEntityClass.params.tableName}' objects was started.`);
      let childNodes = _.get<BaseNode<BaseEntity>[]>(this, key, []);
      return MyPromise.eachPromiseSeries(childNodes, (childNode: BaseNode<BaseEntity>) => {
        return childNode.finalize();
      }).then(() => {
        _.set(this, key, []);
      });
    }).then(() => {
      this.status = "stop";
    });
  }

  run(...args: string[]): void {
    this.socketIoServerService.run(this.entity._id);
  }

  log(level: TSocketIoLogLevel, message: string, ...args: any[]): void {
    message = util.format(message, ...args);
    this.socketIoServerService.log(this.entity._id, level, message);
    for (let node of this.socketIoServerService.getNodes("notifier")) {
      let notifierNode = <NotifierNode<BaseNotifierEntity>>node;
      if (this.logLevelToNumber(level) >= this.logLevelToNumber(notifierNode.entity.level))
        notifierNode.run(message);
    }
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

  private logLevelToNumber(level: TSocketIoLogLevel): number {
    switch (level) {
      case "trace":
        return 1;
      case "debug":
        return 2;
      case "info":
        return 3;
      case "warn":
        return 4;
      case "error":
        return 5;
      case "fatal":
        return 6;
      case "none":
        return 7;
    }
  }

  public allKeyLabel(...args: string[]): string {
    if (this.parent)
      return this.parent.allKeyLabel(this._keyLabel(), ...args);
    else
      return `[${args.join('->')}]`;
  }

  protected _keyLabel(): string {
    return `${this.entity.shortId}(${(<any>this.constructor).name})`;
  }

}
