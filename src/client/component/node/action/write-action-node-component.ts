import Component from "vue-class-component";

import BaseActionNodeComponent from "./base-action-node-component";
import {WriteActionNodeEntity} from "../../../../common/entity/node/action/write-action-node-entity";

@Component({})
export default class WriteActionNodeComponent extends BaseActionNodeComponent<WriteActionNodeEntity> {

  EntityClass = WriteActionNodeEntity;

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
