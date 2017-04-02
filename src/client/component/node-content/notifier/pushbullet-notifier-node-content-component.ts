import Component from "vue-class-component";

import BaseNotifierNodeContentComponent from "./base-notifier-node-content-component";
import {PushbulletNotifierNodeEntity} from "../../../../common/entity/node/notifier/pushbullet-notifier-node-entity";

@Component({})
export default class PushbulletNotifierNodeContentComponent extends BaseNotifierNodeContentComponent<PushbulletNotifierNodeEntity> {
}
