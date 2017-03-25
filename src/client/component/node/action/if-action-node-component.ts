import Component from "vue-class-component";

import BaseActionNodeComponent from "./base-action-node-component";
import {IfActionEntity} from "../../../../common/entity/action/if-action-entity";

@Component({})
export default class IfActionNodeComponent extends BaseActionNodeComponent<IfActionEntity> {

  EntityClass = IfActionEntity;

  run(flag: boolean) {
    this.socketIoClientService.send(this.entity._id, flag ? "if" : "else");
  }

}
