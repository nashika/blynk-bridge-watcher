import Component from "vue-class-component";

import BaseActionNodeComponent from "./base-action-node-component";
import {IfActionNodeEntity} from "../../../../common/entity/node/action/if-action-node-entity";

@Component({})
export default class IfActionNodeComponent extends BaseActionNodeComponent<IfActionNodeEntity> {

  EntityClass = IfActionNodeEntity;

  run(flag: boolean) {
    this.socketIoClientService.send(this.entity._id, flag ? "if" : "else");
  }

}
