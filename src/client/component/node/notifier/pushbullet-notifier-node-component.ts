import Component from "vue-class-component";

import BaseNotifierNodeComponent from "./base-notifier-node-component";
import {PushbulletNotifierNodeEntity} from "../../../../common/entity/node/notifier/pushbullet-notifier-node-entity";

@Component({})
export default class PushbulletNotifierNodeComponent extends BaseNotifierNodeComponent<PushbulletNotifierNodeEntity> {

  EntityClass = PushbulletNotifierNodeEntity;

}
