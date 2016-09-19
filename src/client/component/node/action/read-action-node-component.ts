import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionNodeComponent} from "./base-action-node-component";
import {ReadActionEntity} from "../../../../common/entity/action/read-action-entity";

let template = require("./read-action-node-component.jade");

@Component({
  template: template,
})
export class ReadActionNodeComponent extends BaseActionNodeComponent<ReadActionEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: ReadActionEntity,
    });
  }

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
