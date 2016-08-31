import {BridgeNode} from "../bridge/bridge-node";
import {ActionNode} from "./action-node";
import {WriteActionEntity} from "../../../common/entity/action/write-action-entity";

export class WriteActionNode extends ActionNode<WriteActionEntity> {

  run = (bridge:BridgeNode, ...args:string[]) => {
    this.log("debug", `Write action. type=${this.entity.pinType}, pin=${this.entity.pin}, value=${this.entity.value}`);
    bridge.write(this.entity.pinType, this.entity.pin, this.entity.value);
  };

}
