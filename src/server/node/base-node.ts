import util = require("util");

import _ = require("lodash");
import log4js = require("log4js");
import Socket = SocketIO.Socket;
import {injectable} from "inversify";

import {BaseEntity} from "../../common/entity/base-entity";
import {MyPromise} from "../../common/util/my-promise";
import {TSocketIoLogLevel, TSocketIoStatus} from "../../common/util/socket-io-util";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";
import {NotifierNode} from "./notifier/notifier-node";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";
import {NodeService} from "../service/node-service";
import {kernel} from "../../common/inversify.config";

@injectable()
export abstract class BaseNode<T extends BaseEntity> {

  EntityClass: typeof BaseEntity;

  parent: BaseNode<BaseEntity>;
  entity: T;

  private _status: TSocketIoStatus;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    let name = _.lowerFirst(_.replace(this.constructor.name, /Node$/, ""));
    this.EntityClass = <any>kernel.getNamed(BaseEntity, name);
  }

  get status(): TSocketIoStatus {
    return this._status;
  }

  set status(value: TSocketIoStatus) {
    this._status = value;
    this.socketIoServerService.status(this.entity._id, value);
  }

  initialize(): Promise<void> {
    this.nodeService.registerNode(this);
    return MyPromise.eachPromiseSeries(this.EntityClass.params.children, (ChildEntityClass: typeof BaseEntity, key: string) => {
      this.log("debug", `Construct child '${ChildEntityClass.params.tableName}' objects was started.`);
      let childNodes: BaseNode<BaseEntity>[] = [];
      _.set(this, key, childNodes);
      return Promise.resolve().then(() => {
        return this.tableService.find(ChildEntityClass, {_parent: this.entity._id});
      }).then(entities => {
        return MyPromise.eachPromiseSeries(entities, (entity: BaseEntity) => {
          return Promise.resolve().then(() => {
            return this.nodeService.generate(this, entity);
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
    this.nodeService.unregisterNode(this.entity._id);
    return MyPromise.eachPromiseSeries(this.EntityClass.params.children, (ChildEntityClass: typeof BaseEntity, key: string) => {
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

  start(): Promise<void> {
    this.status = "processing";
    return Promise.resolve();
  }

  stop(): Promise<void> {
    return Promise.resolve();
  }

  run(...args: string[]): void {
    this.socketIoServerService.run(this.entity._id);
  }

  log(level: TSocketIoLogLevel, message: string, ...args: any[]): void {
    message = util.format(message, ...args);
    this.socketIoServerService.log(this.entity._id, level, message);
    for (let node of this.nodeService.getNodes("notifier")) {
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
