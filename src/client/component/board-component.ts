import Component from "vue-class-component";
import _ = require("lodash");

import {BoardEntity} from "../../common/entity/board-entity";
import {ServerComponent} from "./server-component";
import {BaseEntityComponent} from "./base-entity-component";
import {BridgeComponent} from "./bridge-component";
import {BridgeEntity} from "../../common/entity/bridge-entity";

let template = require("./board-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
    "bridge-component": BridgeComponent,
  },
  props: ["entity", "add"],
  ready: BoardComponent.prototype.onReady,
})
export class BoardComponent extends BaseEntityComponent<BoardEntity> {

  bridges: BridgeEntity[];

  data(): any {
    return _.merge(super.data(), {
      EntityClass: BoardEntity,
      bridges: null,
    });
  }

}
