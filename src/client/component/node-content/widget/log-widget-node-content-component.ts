import Component from "vue-class-component";

import BaseWidgetNodeContentComponent from "./base-widget-node-content-component";
import {LogWidgetNodeEntity} from "../../../../common/entity/node/widget/log-widget-node-entity";

@Component({})
export default class LogWidgetNodeContentComponent extends BaseWidgetNodeContentComponent<LogWidgetNodeEntity> {
}
