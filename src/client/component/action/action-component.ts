import Component from "vue-class-component";
import _ = require("lodash");

import {BaseEntityComponent} from "../base-entity-component";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {BridgeComponent} from "../bridge-component";
import {IfActionComponent} from "./if-action-component";
import {LogActionComponent} from "./log-action-component";
import {NotifyActionComponent} from "./notify-action-component";
import {ReadActionComponent} from "./read-action-component";
import {WriteActionComponent} from "./write-action-component";

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
export class ActionComponent extends BaseEntityComponent<BaseActionEntity> {

  data(): any {
    return _.merge(super.data(), {
      EntityClass: BaseActionEntity,
    });
  }

}
