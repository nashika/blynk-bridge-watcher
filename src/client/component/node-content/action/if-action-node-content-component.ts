import Component from "vue-class-component";

import BaseActionNodeContentComponent from "./base-action-node-content-component";
import {IfActionNodeEntity} from "../../../../common/entity/node/action/if-action-node-entity";

@Component({})
export default class IfActionNodeContentComponent extends BaseActionNodeContentComponent<IfActionNodeEntity> {

  EntityClass = IfActionNodeEntity;

  run(flag: boolean) {
    this.nodeClientService.send(this.entity._id, flag ? "if" : "else");
  }

}
