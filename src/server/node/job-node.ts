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

  initialize():Promise<void> {
    return super.initialize().then(() => {
      _.defaults(this.entity, {});
      let board: BoardNode;
      if (!(board = this.parent.boards[this.entity.board])) {
        this.log("fatal", `Board '${this.entity.board}' was not found.`);
        process.exit(1);
      }
      if (!(this._bridge = board.bridges[this.entity.bridge])) {
        this.log("fatal", `Board '${this.entity.board}' -> Bridge '${this.entity.bridge}' was not found.`);
        process.exit(1);
      }
      if (!this._bridge.actions[this.entity.action]) {
        this.log("fatal", `Board '${this.entity.board}' -> Bridge '${this.entity.bridge}' -> Action '${this.entity.action}' was not found.`);
        process.exit(1);
      }
      try {
        this._cronJob = new CronJob(this.entity.cronTime, this._run);
      } catch (e) {
        this.log("fatal", `cronTime '${this.entity.cronTime}' is invalid format.`);
        process.exit(1);
      }
      this._cronJob.start();
    });
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
