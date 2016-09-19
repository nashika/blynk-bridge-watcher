import Component from "vue-class-component";
import _ = require("lodash");

import {BaseNotifierNodeComponent} from "./base-notifier-node-component";
import {PushbulletNotifierEntity} from "../../../../common/entity/notifier/pushbullet-notifier-entity";

let template = require("./pushbullet-notifier-node-component.jade");

@Component({
  template: template,
})
export class PushbulletNotifierNodeComponent extends BaseNotifierNodeComponent<PushbulletNotifierEntity> {

  data(): any {
    return _.assign(super.data(), {});
  }

}
