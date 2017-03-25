import Component from "vue-class-component";

import BaseNotifierNodeComponent from "./base-notifier-node-component";
import {PushbulletNotifierEntity} from "../../../../common/entity/notifier/pushbullet-notifier-entity";

@Component({})
export default class PushbulletNotifierNodeComponent extends BaseNotifierNodeComponent<PushbulletNotifierEntity> {

  EntityClass = PushbulletNotifierEntity;

}
