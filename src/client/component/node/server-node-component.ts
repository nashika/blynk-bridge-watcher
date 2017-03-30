import Component from "vue-class-component";

import {ServerNodeEntity} from "../../../common/entity/node/server-node-entity";
import {BoardNodeEntity} from "../../../common/entity/node/board-node-entity";
import {JobNodeEntity} from "../../../common/entity/node/job-node-entity";
import BaseNodeComponent from "./base-node-component";
import {BaseNotifierNodeEntity} from "../../../common/entity/node/notifier/base-notifier-node-entity";
import {logger} from "../../logger";

@Component({})
export default class ServerNodeComponent extends BaseNodeComponent<ServerNodeEntity> {

  EntityClass = ServerNodeEntity;
  boards: BoardNodeEntity[] = null;
  notifiers: BaseNotifierNodeEntity[] = null;
  jobs: JobNodeEntity[] = null;

  async start() {
    logger.debug("start server");
    await this.nodeClientService.start();
  }

  async stop() {
    logger.debug("stop server");
    await this.nodeClientService.stop();
  }

}
