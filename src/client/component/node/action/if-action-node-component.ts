import Component from "vue-class-component";

import {BaseActionNodeComponent} from "./base-action-node-component";
import {IfActionEntity} from "../../../../common/entity/action/if-action-entity";

let template = require("./if-action-node-component.pug");

@Component({
  template: template,
})
export class IfActionNodeComponent extends BaseActionNodeComponent<IfActionEntity> {

  EntityClass = IfActionEntity;

  run(flag: boolean) {
    this.socketIoClientService.send(this.entity._id, flag ? "if" : "else");
  }

}
