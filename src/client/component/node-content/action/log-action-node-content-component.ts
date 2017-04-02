import Component from "vue-class-component";

import BaseActionNodeContentComponent from "./base-action-node-content-component";
import {LogActionNodeEntity} from "../../../../common/entity/node/action/log-action-node-entity";

@Component({})
export default class LogActionNodeContentComponent extends BaseActionNodeContentComponent<LogActionNodeEntity> {
}
