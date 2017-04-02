import Component from "vue-class-component";

import {ServerNodeEntity} from "../../../common/entity/node/server-node-entity";
import BaseNodeContentComponent from "./base-node-content-component";
import {logger} from "../../logger";

@Component({})
export default class ServerNodeContentComponent extends BaseNodeContentComponent<ServerNodeEntity> {

  async start() {
    logger.debug("start server");
    await this.nodeClientService.start();
  }

  async stop() {
    logger.debug("stop server");
    await this.nodeClientService.stop();
  }

}
