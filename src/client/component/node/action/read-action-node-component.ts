import Component from "vue-class-component";

import BaseActionNodeComponent from "./base-action-node-component";
import {ReadActionNodeEntity} from "../../../../common/entity/node/action/read-action-node-entity";

@Component({})
export default class ReadActionNodeComponent extends BaseActionNodeComponent<ReadActionNodeEntity> {

  EntityClass = ReadActionNodeEntity;

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
