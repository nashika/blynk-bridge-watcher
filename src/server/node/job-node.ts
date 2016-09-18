import _ = require("lodash");
import {CronJob} from "cron";

import {BaseNode} from "./base-node";
import {ServerNode} from "./server-node";
import {JobEntity} from "../../common/entity/job-entity";
import {ActionNode} from "./action/action-node";
import {BaseActionEntity} from "../../common/entity/action/base-action-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

export class JobNode extends BaseNode<JobEntity> {

  static EntityClass = JobEntity;

  parent: ServerNode;

  private cronJob: CronJob;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

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
    super.run();
    let action = <ActionNode<BaseActionEntity>>this.socketIoServerService.getNode(this.entity.action);
    if (action.status != "ready") {
      return action.log("warn", `Job '${this.entity._id}' can not run. Action '${action.entity._id}' status='${action.status}' is not ready.`);
    }
    this.log("debug", `Job '${this.entity._id}' was kicked.`);
    action.run();
  }

}
