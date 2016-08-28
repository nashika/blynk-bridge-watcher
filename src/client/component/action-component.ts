import Component from "vue-class-component";
import _ = require("lodash");

import {BaseEntityComponent} from "./base-entity-component";
import {ActionEntity} from "../../common/entity/action-entity";
import {BridgeComponent} from "./bridge-component";
import {IfActionComponent} from "./action/if-action-component";
import {LogActionComponent} from "./action/log-action-component";
import {NotifyActionComponent} from "./action/notify-action-component";
import {ReadActionComponent} from "./action/read-action-component";
import {WriteActionComponent} from "./action/write-action-component";

let template = require("./action-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
    "if-action-component": IfActionComponent,
    "log-action-component": LogActionComponent,
    "notify-action-component": NotifyActionComponent,
    "read-action-component": ReadActionComponent,
    "write-action-component": WriteActionComponent,
  },
  props: ["entity", "add"],
  ready: ActionComponent.prototype.onReady,
})
export class ActionComponent extends BaseEntityComponent<ActionEntity> {

  $parent: BridgeComponent;

  data(): any {
    return _.merge(super.data(), {
      EntityClass: ActionEntity,
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

  delete() {
    super.delete();
  }

}
