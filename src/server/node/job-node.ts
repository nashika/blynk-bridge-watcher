import _ = require("lodash");
import {CronJob} from "cron";

import {BaseNode} from "./base-node";
import {ServerNode} from "./server-node";
import {JobEntity} from "../../common/entity/job-entity";
import {socketIoServer} from "../socket-io";
import {ActionNode} from "./action/action-node";
import {BaseActionEntity} from "../../common/entity/action/base-action-entity";

export class JobNode extends BaseNode<JobEntity> {

  static EntityClass = JobEntity;

  parent: ServerNode;

  private cronJob: CronJob;

  initialize(): Promise<void> {
    return super.initialize().then(() => {
      _.defaults(this.entity, {});
      try {
        this.cronJob = new CronJob(this.entity.cronTime, () => this.run());
      } catch (e) {
        this.log("fatal", `cronTime '${this.entity.cronTime}' is invalid format.`);
        process.exit(1);
      }
      this.cronJob.start();
      this.status = "ready";
    });
  }

  run(): void {
    let action = <ActionNode<BaseActionEntity>>socketIoServer.getNode(this.entity.action);
    if (action.status != "ready") {
      return action.log("warn", `Job '${this.name}' can not run. Action '${action.name}' status='${action.status}' is not ready.`);
    }
    this.log("debug", `Job '${this.name}' was kicked.`);
    action.run();
  }

}
