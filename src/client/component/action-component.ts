import Component from "vue-class-component";
import _ = require("lodash");

import {BridgeEntity} from "../../common/entity/bridge-entity";
import {BaseEntityComponent} from "./base-entity-component";
import {ActionEntity} from "../../common/entity/action-entity";
import {BridgeComponent} from "./bridge-component";

let template = require("./action-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
  },
  props: ["entity", "add"],
  ready: ActionComponent.prototype.onReady,
})
export class ActionComponent extends BaseEntityComponent<ActionEntity> {

  $parent: BridgeComponent;

  data(): any {
    return _.merge(super.data(), {
    });
  }

  onReady() {
    super.onReady(ActionEntity);
  }

  reload() {
    super.reload({});
  }

  edit() {
    super.edit();
  }

  delete() {
    super.delete();
  }

}
