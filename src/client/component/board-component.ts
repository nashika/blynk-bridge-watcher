import Component from "vue-class-component";
import _ = require("lodash");

import {BoardEntity} from "../../common/entity/board-entity";
import {ServerComponent} from "./server-component";
import {BaseEntityComponent} from "./base-entity-component";

let template = require("./board-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
  },
  props: ["entity", "add"],
  ready: BoardComponent.prototype.onReady,
})
export class BoardComponent extends BaseEntityComponent<BoardEntity> {

  $parent: ServerComponent;

  data(): any {
    return super.data();
  }

  onReady() {
    super.onReady(BoardEntity);
  }

  edit() {
    super.edit();
  }

  delete() {
    super.delete();
  }

}
