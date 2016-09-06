import {ActionNode} from "./action-node";
import {WriteActionEntity} from "../../../common/entity/action/write-action-entity";

export class WriteActionNode extends ActionNode<WriteActionEntity> {

  run(...args: string[]) {
    this.log("debug", `Write action. type=${this.entity.pinType}, pin=${this.entity.pin}, value=${this.entity.value}`);
    this.parent.write(this.entity.pinType, this.entity.pin, this.entity.value);
  };

}
