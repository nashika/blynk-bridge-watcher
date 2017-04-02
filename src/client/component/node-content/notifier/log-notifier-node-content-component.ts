import Component from "vue-class-component";

import BaseNotifierNodeContentComponent from "./base-notifier-node-content-component";
import {LogNotifierNodeEntity} from "../../../../common/entity/node/notifier/log-notifier-node-entity";

@Component({})
export default class LogNotifierNodeContentComponent extends BaseNotifierNodeContentComponent<LogNotifierNodeEntity> {
}
