import Component from "vue-class-component";
import _ = require("lodash");

import {BaseNotifierComponent} from "./base-notifier-component";
import {PushbulletNotifierEntity} from "../../../common/entity/notifier/pushbullet-notifier-entity";

let template = require("./pushbullet-notifier-component.jade");

@Component({
  template: template,
})
export class PushbulletNotifierComponent extends BaseNotifierComponent<PushbulletNotifierEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: PushbulletNotifierEntity,
    });
  }

}
