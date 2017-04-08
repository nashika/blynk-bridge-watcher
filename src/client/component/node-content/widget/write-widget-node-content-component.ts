import Component from "vue-class-component";

import BaseWidgetNodeContentComponent from "./base-widget-node-content-component";
import {WriteWidgetNodeEntity} from "../../../../common/entity/node/widget/write-widget-node-entity";

@Component({})
export default class WriteWidgetNodeContentComponent extends BaseWidgetNodeContentComponent<WriteWidgetNodeEntity> {

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
