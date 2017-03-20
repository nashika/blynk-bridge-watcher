import Component from "vue-class-component";

import {BoardNodeComponent} from "./board-node-component";
import {ServerEntity} from "../../../common/entity/server-entity";
import {BoardEntity} from "../../../common/entity/board-entity";
import {JobEntity} from "../../../common/entity/job-entity";
import {BaseNodeComponent} from "./base-node-component";
import {NotifierNodeComponent} from "./notifier/notifier-node-component";
import {JobNodeComponent} from "./job-node-component";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";
import {ServerService} from "../../service/server-service";
import {container} from "../../../common/inversify.config";

let template = require("./server-node-component.jade");

@Component({
  template: template,
  components: {
    "board-node-component": BoardNodeComponent,
    "notifier-node-component": NotifierNodeComponent,
    "job-node-component": JobNodeComponent,
  },
})
export class ServerNodeComponent extends BaseNodeComponent<ServerEntity> {

  EntityClass = ServerEntity;
  serverService: ServerService = container.get(ServerService);
  boards: BoardEntity[] = null;
  notifiers: BaseNotifierEntity[] = null;
  jobs: JobEntity[] = null;

  start() {
    this.serverService.start();
  }

  stop() {
    this.serverService.stop();
  }

}
