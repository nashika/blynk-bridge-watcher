import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {IfActionComponent} from "./if-action-component";
import {LogActionComponent} from "./log-action-component";
import {NotifyActionComponent} from "./notify-action-component";
import {ReadActionComponent} from "./read-action-component";
import {WriteActionComponent} from "./write-action-component";
import {BaseSwitchComponent} from "../base-switch-component";

let template = require("./action-component.jade");

@Component({
  template: template,
  components: {
    "if-action-component": IfActionComponent,
    "log-action-component": LogActionComponent,
    "notify-action-component": NotifyActionComponent,
    "read-action-component": ReadActionComponent,
    "write-action-component": WriteActionComponent,
  },
})
export class ActionComponent extends BaseSwitchComponent<BaseActionEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: BaseActionEntity,
    });
  }

}
