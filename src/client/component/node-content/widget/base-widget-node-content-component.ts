import Component from "vue-class-component";

import BaseNodeContentComponent from "../base-node-content-component";
import {BaseWidgetNodeEntity} from "../../../../common/entity/node/widget/base-widget-node-entity";

@Component({})
export default class BaseWidgetNodeContentComponent<T extends BaseWidgetNodeEntity> extends BaseNodeContentComponent<T> {
}
