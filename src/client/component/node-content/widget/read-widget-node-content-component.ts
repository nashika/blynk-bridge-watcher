import Component from "vue-class-component";

import BaseWidgetNodeContentComponent from "./base-widget-node-content-component";
import {ReadWidgetNodeEntity} from "../../../../common/entity/node/widget/read-widget-node-entity";

@Component({})
export default class ReadWidgetNodeContentComponent extends BaseWidgetNodeContentComponent<ReadWidgetNodeEntity> {

  get shortPinType(): string {
    switch (this.entity.pinType) {
      case "digital":
        return "D";
      case "analog":
        return "A";
      case "virtual":
        return "V";
      default:
        return "?";
    }
  }

}
