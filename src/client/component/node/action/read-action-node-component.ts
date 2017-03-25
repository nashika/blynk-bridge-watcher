import Component from "vue-class-component";

import BaseActionNodeComponent from "./base-action-node-component";
import {ReadActionEntity} from "../../../../common/entity/action/read-action-entity";

@Component({})
export default class ReadActionNodeComponent extends BaseActionNodeComponent<ReadActionEntity> {

  EntityClass = ReadActionEntity;

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
