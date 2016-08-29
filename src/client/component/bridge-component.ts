import Component from "vue-class-component";
import _ = require("lodash");

import {BoardComponent} from "./board-component";
import {BridgeEntity} from "../../common/entity/bridge-entity";
import {BaseEntityComponent} from "./base-entity-component";
import {ActionEntity} from "../../common/entity/action-entity";
import {ActionComponent} from "./action/action-component";

let template = require("./bridge-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
    "action-component": ActionComponent,
  },
  props: ["entity", "add"],
  ready: BridgeComponent.prototype.onReady,
})
export class BridgeComponent extends BaseEntityComponent<BridgeEntity> {

  $parent: BoardComponent;
  actions:ActionEntity[];

  data(): any {
    return _.merge(super.data(), {
      EntityClass: BridgeEntity,
      actions: null,
    });
  }

}
