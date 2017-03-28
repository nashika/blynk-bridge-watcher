import _ = require("lodash");
import {injectable} from "inversify";
import {CronJob} from "cron";

import {BaseNode} from "./base-node";
import {ServerNode} from "./server-node";
import {JobNodeEntity} from "../../common/entity/node/job-node-entity";
import {ActionNode} from "./action/action-node";
import {BaseActionNodeEntity} from "../../common/entity/node/action/base-action-node-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";
import {NodeService} from "../service/node-server-service";

@injectable()
export class JobNode extends BaseNode<JobNodeEntity> {

  parent: ServerNode;

  private cronJob: CronJob;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
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

  finalize(): Promise<void> {
    return super.finalize().then(() => {
      this.cronJob.stop();
      this.cronJob = null;
    });
  }

  run(): void {
    super.run();
    let action = <ActionNode<BaseActionNodeEntity>>this.nodeService.getNodeById(this.entity.action);
    if (action.status != "ready") {
      return action.log("warn", `Job '${this.entity._id}' can not run. Action '${action.entity._id}' status='${action.status}' is not ready.`);
    }
    this.log("debug", `Job '${this.entity._id}' was kicked.`);
    action.run();
  }

}
