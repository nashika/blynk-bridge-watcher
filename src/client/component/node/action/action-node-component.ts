import Component from "vue-class-component";

import {BaseActionEntity} from "../../../../common/entity/action/base-action-entity";
import {IfActionNodeComponent} from "./if-action-node-component";
import {LogActionNodeComponent} from "./log-action-node-component";
import {NotifyActionNodeComponent} from "./notify-action-node-component";
import {ReadActionNodeComponent} from "./read-action-node-component";
import {WriteActionNodeComponent} from "./write-action-node-component";
import {BaseSwitchNodeComponent} from "../base-switch-node-component";

let template = require("./action-node-component.pug");

@Component({
  template: template,
  components: {
    "if-action-node-component": IfActionNodeComponent,
    "log-action-node-component": LogActionNodeComponent,
    "notify-action-node-component": NotifyActionNodeComponent,
    "read-action-node-component": ReadActionNodeComponent,
    "write-action-node-component": WriteActionNodeComponent,
  },
})
export class ActionNodeComponent extends BaseSwitchNodeComponent<BaseActionEntity> {
}
