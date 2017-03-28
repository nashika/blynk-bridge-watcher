import Component from "vue-class-component";

import {ServerNodeEntity} from "../../../common/entity/node/server-node-entity";
import {BoardNodeEntity} from "../../../common/entity/node/board-node-entity";
import {JobNodeEntity} from "../../../common/entity/node/job-node-entity";
import BaseNodeComponent from "./base-node-component";
import {BaseNotifierNodeEntity} from "../../../common/entity/node/notifier/base-notifier-node-entity";
import {ServerService} from "../../service/server-service";
import {container} from "../../../common/inversify.config";

@Component({})
export default class ServerNodeComponent extends BaseNodeComponent<ServerNodeEntity> {

  EntityClass = ServerNodeEntity;
  serverService: ServerService = container.get(ServerService);
  boards: BoardNodeEntity[] = null;
  notifiers: BaseNotifierNodeEntity[] = null;
  jobs: JobNodeEntity[] = null;

  start() {
    console.log("start");
    this.serverService.start();
  }

  stop() {
    console.log("stop");
    this.serverService.stop();
  }

}
