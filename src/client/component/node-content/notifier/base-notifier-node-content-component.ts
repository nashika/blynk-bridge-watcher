import Component from "vue-class-component";

import BaseNodeContentComponent from "../base-node-content-component";
import {BaseNotifierNodeEntity} from "../../../../common/entity/node/notifier/base-notifier-node-entity";

@Component({})
export default class BaseNotifierNodeContentComponent<T extends BaseNotifierNodeEntity> extends BaseNodeContentComponent<T> {
}
