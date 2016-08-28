import Component from "vue-class-component";

import {BaseComponent} from "./base-component";
import {BoardComponent} from "./board-component";
import {ServerEntity} from "../../common/entity/server-entity";
import {serviceRegistry} from "../service/service-registry";
import {BoardEntity} from "../../common/entity/board-entity";
import {NotifierEntity} from "../../common/entity/notifier-entity";
import {JobEntity} from "../../common/entity/job-entity";

let template = require("./server-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    "board-component": BoardComponent,
  },
  props: ["entity"],
  ready: ServerComponent.prototype.onReady,
})
export class ServerComponent extends BaseComponent {

  entity: ServerEntity;
  boards: BoardEntity[];
  notifiers: NotifierEntity[];
  jobs: JobEntity[];

  data(): any {
    return {
      boards: null,
      notifiers: null,
      jobs: null,
    }
  }

  onReady() {
    this.reload();
  }

  reload() {
    this.boards = null;
    this.notifiers = null;
    this.jobs = null;
    serviceRegistry.entity.getAll(BoardEntity).then(entities => {
      this.boards = entities;
    });
  }

}
