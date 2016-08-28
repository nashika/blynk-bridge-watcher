import Component from "vue-class-component";
import _ = require("lodash");

import {BoardComponent} from "./board-component";
import {BridgeEntity} from "../../common/entity/bridge-entity";
import {BaseEntityComponent} from "./base-entity-component";

let template = require("./bridge-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
  },
  props: ["entity", "add"],
  ready: BridgeComponent.prototype.onReady,
})
export class BridgeComponent extends BaseEntityComponent<BridgeEntity> {

  $parent:BoardComponent;

  data():any {
    return super.data();
  }

  onReady() {
    super.onReady(BridgeEntity);
  }

  edit() {
    super.edit();
  }

  delete() {
    super.delete();
  }

}
