import util = require("util");

import _ = require("lodash");
import log4js = require("log4js");
import {injectable} from "inversify";

import {TSocketIoLogLevel, TSocketIoStatus} from "../../common/util/socket-io-util";
import {BaseNotifierNodeEntity} from "../../common/entity/node/notifier/base-notifier-node-entity";
import {NotifierNode} from "./notifier/notifier-node";
import {NodeServerService} from "../service/node-server-service";
import {container} from "../../common/inversify.config";
import {BaseNodeEntity, INodeEntityNextNode} from "../../common/entity/node/base-node-entity";

@injectable()
export abstract class BaseNode<T extends BaseNodeEntity> {

  EntityClass: typeof BaseNodeEntity;

  parent: BaseNode<BaseNodeEntity>;
  entity: T;

  private _status: TSocketIoStatus;

  constructor(protected nodeServerService: NodeServerService) {
    let name = _.lowerFirst(_.replace(this.constructor.name, /Node$/, ""));
    this.EntityClass = <any>container.getNamed(BaseNodeEntity, name);
  }

  get status(): TSocketIoStatus {
    return this._status;
  }

  set status(value: TSocketIoStatus) {
    this._status = value;
    this.nodeServerService.status(this.entity._id, value);
  }

  async initializeWrap(): Promise<void> {
    this.log("debug", `Initialize process was started.`);
    await this.initialize();
    this.log("debug", `Initialize process was finished.`)
  }

  protected async initialize(): Promise<void> {
    this.nodeServerService.register(this);
    for (let key in this.EntityClass.params.children) {
      let ChildEntityClass: typeof BaseNodeEntity = this.EntityClass.params.children[key];
      this.log("debug", `Construct child '${ChildEntityClass.params.type}' objects was started.`);
      let childNodes: BaseNode<BaseNodeEntity>[] = [];
      _.set(this, key, childNodes);
      let entities = await this.nodeServerService.find({type: ChildEntityClass.params.type, _parent: this.entity._id});
      for (let entity of entities) {
        let node = await this.nodeServerService.generate(this, entity);
        childNodes.push(node);
      }
      this.log("debug", `Construct child '${key}' objects was finished.`);
    }
  }

  async finalizeWrap(): Promise<void> {
    this.log("debug", `Finalize process was started.`);
    await this.finalize();
    this.log("debug", `Finalize process was finished.`);
  }

  protected async finalize(): Promise<void> {
    this.status = "processing";
    this.nodeServerService.unregister(this.entity._id);
    for (let key in this.EntityClass.params.children) {
      let ChildEntityClass: typeof BaseNodeEntity = this.EntityClass.params.children[key];
      this.log("debug", `Destruct child '${ChildEntityClass.params.type}' objects was started.`);
      let childNodes = _.get<BaseNode<BaseNodeEntity>[]>(this, key, []);
      for (let childNode of childNodes) {
        await childNode.finalize();
      }
      _.set(this, key, []);
    }
    this.status = "stop";
  }

  async startWrap(): Promise<void> {
    this.log("debug", `Start process was started.`);
    await this.start();
    this.log("debug", `Start process was finished.`);
  }

  protected async start(): Promise<void> {
    this.status = "processing";
  }

  async stopWrap(): Promise<void> {
    this.log("debug", `Stop process was started.`);
    await this.stop();
    this.log("debug", `Stop process was finished.`);
  }

  protected async stop(): Promise<void> {
  }

  async run(..._args: string[]): Promise<void> {
    this.nodeServerService.run(this.entity._id);
  }

  async runNextNodes(nextNodes: INodeEntityNextNode[], ...args: string[]): Promise<void> {
    for (let nextNode of nextNodes) {
      let node: BaseNode<BaseNodeEntity> = this.nodeServerService.getNodeById(nextNode.id);
      if (node.status != "ready") {
        return this.log("warn", `Next node "${nextNode.id}" can not run. Node status="${node.status}" is not ready.`);
      }
      await node.run(...args);
    }
  }

  log(level: TSocketIoLogLevel, message: string, ...args: any[]): void {
    message = util.format(message, ...args);
    this.nodeServerService.log(this.entity._id, level, message);
    for (let node of this.nodeServerService.getNodesByType("notifier")) {
      let notifierNode = <NotifierNode<BaseNotifierNodeEntity>>node;
      if (this.logLevelToNumber(level) >= this.logLevelToNumber(notifierNode.entity.level))
        notifierNode.run(message);
    }
    let logger = log4js.getLogger("system");
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

  private allKeyLabel(...args: string[]): string {
    if (this.parent) {
      return this.parent.allKeyLabel(this.keyLabel(), ...args);
    } else {
      args.unshift(this.keyLabel());
      return `[${args.join('->')}]`;
    }
  }

  private keyLabel(): string {
    return `${this.entity._id}(${_.replace((<any>this.constructor).name, /Node$/, "")})`;
  }

}
