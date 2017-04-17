import _ = require("lodash");
import {injectable} from "inversify";
import {CronJob} from "cron";

import {BaseNode} from "./base-node";
import {ServerNode} from "./server-node";
import {JobNodeEntity} from "../../common/entity/node/job-node-entity";
import {NodeServerService} from "../service/node-server-service";

@injectable()
export class JobNode extends BaseNode<JobNodeEntity> {

  parent: ServerNode;

  private cronJob: CronJob;

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  protected async initialize(): Promise<void> {
    await super.initialize();
    _.defaults(this.entity, {});
    try {
      this.cronJob = new CronJob(this.entity.cronTime, () => this.run());
    } catch (e) {
      this.log("fatal", `cronTime '${this.entity.cronTime}' is invalid format.`);
      process.exit(1);
    }
    this.cronJob.start();
    this.status = "ready";
  }

  protected async finalize(): Promise<void> {
    await super.finalize();
    this.cronJob.stop();
    this.cronJob = null;
  }

  async run(): Promise<void> {
    await super.run();
    await this.runNextNodes(this.entity.next);
    this.log("debug", `Job '${this.entity._id}' was kicked.`);
  }

}
