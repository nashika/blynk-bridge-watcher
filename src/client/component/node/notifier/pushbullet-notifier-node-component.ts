import Component from "vue-class-component";

import {BaseNotifierNodeComponent} from "./base-notifier-node-component";
import {PushbulletNotifierEntity} from "../../../../common/entity/notifier/pushbullet-notifier-entity";

let template = require("./pushbullet-notifier-node-component.pug");

@Component({
  template: template,
})
export class PushbulletNotifierNodeComponent extends BaseNotifierNodeComponent<PushbulletNotifierEntity> {

  EntityClass = PushbulletNotifierEntity;

}
