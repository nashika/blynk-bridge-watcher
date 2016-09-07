import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionEntity} from "../../../../common/entity/action/base-action-entity";
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

  data(): any {
    return _.assign(super.data(), {
      EntityClass: BaseActionEntity,
    });
  }

}
