import Component from "vue-class-component";

import {ServerEntity} from "../../../common/entity/server-entity";
import {BoardEntity} from "../../../common/entity/board-entity";
import {JobEntity} from "../../../common/entity/job-entity";
import BaseNodeComponent from "./base-node-component";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";
import {ServerService} from "../../service/server-service";
import {container} from "../../../common/inversify.config";

@Component({})
export default class ServerNodeComponent extends BaseNodeComponent<ServerEntity> {

  EntityClass = ServerEntity;
  serverService: ServerService = container.get(ServerService);
  boards: BoardEntity[] = null;
  notifiers: BaseNotifierEntity[] = null;
  jobs: JobEntity[] = null;

  start() {
    console.log("start");
    this.serverService.start();
  }

  stop() {
    console.log("stop");
    this.serverService.stop();
  }

}
