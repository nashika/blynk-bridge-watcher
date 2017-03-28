import Component from "vue-class-component";

import {ServerNodeEntity} from "../../../common/entity/node/server-node-entity";
import {BoardNodeEntity} from "../../../common/entity/node/board-node-entity";
import {JobNodeEntity} from "../../../common/entity/node/job-node-entity";
import BaseNodeComponent from "./base-node-component";
import {BaseNotifierNodeEntity} from "../../../common/entity/node/notifier/base-notifier-node-entity";

@Component({})
export default class ServerNodeComponent extends BaseNodeComponent<ServerNodeEntity> {

  EntityClass = ServerNodeEntity;
  boards: BoardNodeEntity[] = null;
  notifiers: BaseNotifierNodeEntity[] = null;
  jobs: JobNodeEntity[] = null;

  async start() {
    console.log("start");
    await this.nodeEntityService.start();
  }

  async stop() {
    console.log("stop");
    this.nodeEntityService.stop();
  }

}
