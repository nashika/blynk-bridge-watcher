import Component from "vue-class-component";

import {BaseActionNodeComponent} from "./base-action-node-component";
import {WriteActionEntity} from "../../../../common/entity/action/write-action-entity";

let template = require("./write-action-node-component.jade");

@Component({
  template: template,
})
export class WriteActionNodeComponent extends BaseActionNodeComponent<WriteActionEntity> {

  EntityClass = WriteActionEntity;

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
