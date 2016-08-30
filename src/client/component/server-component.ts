import Component from "vue-class-component";
import _ = require("lodash");

import {BoardComponent} from "./board-component";
import {ServerEntity} from "../../common/entity/server-entity";
import {BoardEntity} from "../../common/entity/board-entity";
import {JobEntity} from "../../common/entity/job-entity";
import {BaseEntityComponent} from "./base-entity-component";
import {NotifierComponent} from "./notifier/notifier-component";
import {JobComponent} from "./job-component";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";

let template = require("./server-component.jade");

@Component({
  template: template,
  components: {
    "board-component": BoardComponent,
    "notifier-component": NotifierComponent,
    "job-component": JobComponent,
  },
})
export class ServerComponent extends BaseEntityComponent<ServerEntity> {

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

}
