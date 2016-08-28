import Component from "vue-class-component";
import _ = require("lodash");

import {BoardComponent} from "./board-component";
import {ServerEntity} from "../../common/entity/server-entity";
import {BoardEntity} from "../../common/entity/board-entity";
import {NotifierEntity} from "../../common/entity/notifier-entity";
import {JobEntity} from "../../common/entity/job-entity";
import {BaseEntityComponent} from "./base-entity-component";

let template = require("./server-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
    "board-component": BoardComponent,
  },
  props: ["entity"],
  ready: ServerComponent.prototype.onReady,
})
export class ServerComponent extends BaseEntityComponent<ServerEntity> {

  boards: BoardEntity[];
  notifiers: NotifierEntity[];
  jobs: JobEntity[];

  data(): any {
    return _.merge(super.data(), {
      EntityClass: ServerEntity,
      boards: null,
      notifiers: null,
      jobs: null,
    });
  }

  onReady() {
    super.onReady();
  }

  reload() {
    super.reload();
  }

  edit() {
    super.edit();
  }

}
