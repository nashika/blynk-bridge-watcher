import _ = require("lodash");
import {CronJob} from "cron";

import {BaseNode} from "./base-node";
import {ServerNode} from "./server-node";
import {BoardNode} from "./board-node";
import {BridgeNode} from "./bridge/bridge-node";
import {JobEntity} from "../../common/entity/job-entity";

export class JobNode extends BaseNode<JobEntity> {

  static EntityClass = JobEntity;

  parent:ServerNode;

  protected _bridge:BridgeNode;
  protected _cronJob:CronJob;

  constructor(server:ServerNode, entity:JobEntity) {
    super(server, entity);
    _.defaults(entity, {});
    let board:BoardNode;
    if (!(board = this.parent.boards[entity.board])) {
      this.log("fatal", `Board '${entity.board}' was not found.`);
      process.exit(1);
    }
    if (!(this._bridge = board.bridges[entity.bridge])) {
      this.log("fatal", `Board '${entity.board}' -> Bridge '${entity.bridge}' was not found.`);
      process.exit(1);
    }
    if (!this._bridge.actions[entity.action]) {
      this.log("fatal", `Board '${entity.board}' -> Bridge '${entity.bridge}' -> Action '${entity.action}' was not found.`);
      process.exit(1);
    }
    try {
      this._cronJob = new CronJob(entity.cronTime, this._run);
    } catch (e) {
      this.log("fatal", `cronTime '${entity.cronTime}' is invalid format.`);
      process.exit(1);
    }
    this._cronJob.start();
  }

  protected _run = ():void => {
    if (this._bridge.status != this._bridge.STATUS_TYPES["ready"]) {
      this._bridge.log("warn", `Job '${this.name}' can not run. Bridge '${this._bridge.name}' status='${this._bridge.status.label}' is not ready.`);
      return;
    }
    this.log("debug", `Job '${this.name}' was kicked.`);
    this._bridge.emit(this.entity.action, this._bridge);
  };

}
