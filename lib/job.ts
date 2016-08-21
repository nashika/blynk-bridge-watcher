import {CronJob} from "cron";

import {Base} from "./base";
import {Server} from "./server";
import {Board} from "./board";
import {Bridge} from "./bridges/bridge";

export class Job extends Base {

  parent:Server;

  protected _cronTime:string;
  protected _bridge:Bridge;
  protected _action:string;
  protected _cronJob:CronJob;

  constructor(server:Server, config:Object) {
    super(server, config);
    this._cronTime = this._checkConfig(config, "cronTime", "string");
    let boardName:string = this._checkConfig(config, "board", "string");
    let board:Board;
    if (!(board = this.parent.boards[boardName])) {
      this.log("fatal", `Board '${boardName}' was not found.`);
      process.exit(1);
    }
    let bridgeName:string = this._checkConfig(config, "bridge", "string");
    if (!(this._bridge = board.bridges[bridgeName])) {
      this.log("fatal", `Board '${boardName}' -> Bridge '${bridgeName}' was not found.`);
      process.exit(1);
    }
    this._action = this._checkConfig(config, "action", "string");
    if (!this._bridge.actions[this._action]) {
      this.log("fatal", `Board '${boardName}' -> Bridge '${bridgeName}' -> Action '${this._action}' was not found.`);
      process.exit(1);
    }
    try {
      this._cronJob = new CronJob(this._cronTime, this._run);
    } catch (e) {
      this.log("fatal", `cronTime '${this._cronTime}' is invalid format.`);
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
    this._bridge.emit(this._action, this._bridge);
  };

}
