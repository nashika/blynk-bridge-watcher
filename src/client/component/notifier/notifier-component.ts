import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {BaseSwitchEntityComponent} from "../base-switch-entity-component";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";
import {PushbulletNotifierComponent} from "./pushbullet-notifier-component";
import {LogNotifierComponent} from "./log-notifier-component";

let template = require("./notifier-component.jade");

@Component({
  template: template,
  components: {
    "log-notifier-component": LogNotifierComponent,
    "pushbullet-notifier-component": PushbulletNotifierComponent,
  },
})
export class NotifierComponent extends BaseSwitchEntityComponent<BaseNotifierEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: BaseActionEntity,
    });
  }

}
