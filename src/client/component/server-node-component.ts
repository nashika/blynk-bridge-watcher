import Component from "vue-class-component";
import _ = require("lodash");

import {BoardNodeComponent} from "./board-node-component";
import {ServerEntity} from "../../common/entity/server-entity";
import {BoardEntity} from "../../common/entity/board-entity";
import {JobEntity} from "../../common/entity/job-entity";
import {BaseNodeComponent} from "./base-node-component";
import {NotifierNodeComponent} from "./notifier/notifier-node-component";
import {JobNodeComponent} from "./job-node-component";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";
import {serviceRegistry} from "../service/service-registry";

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

  boards: BoardEntity[];
  notifiers: BaseNotifierEntity[];
  jobs: JobEntity[];

  data(): any {
    return _.assign(super.data(), {
      EntityClass: ServerEntity,
      boards: null,
      notifiers: null,
      jobs: null,
    });
  }

  start() {
    serviceRegistry.server.start();
  }

  stop() {
    serviceRegistry.server.stop();
  }

}
