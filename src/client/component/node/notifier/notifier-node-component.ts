import Component from "vue-class-component";

import {BaseSwitchNodeComponent} from "../base-switch-node-component";
import {BaseNotifierEntity} from "../../../../common/entity/notifier/base-notifier-entity";
import {PushbulletNotifierNodeComponent} from "./pushbullet-notifier-node-component";
import {LogNotifierNodeComponent} from "./log-notifier-node-component";

let template = require("./notifier-node-component.jade");

@Component({
  template: template,
  components: {
    "log-notifier-node-component": LogNotifierNodeComponent,
    "pushbullet-notifier-node-component": PushbulletNotifierNodeComponent,
  },
})
export class NotifierNodeComponent extends BaseSwitchNodeComponent<BaseNotifierEntity> {
}
