import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {NotifyActionEntity} from "../../../common/entity/action/notify-action-entity";

export class NotifyActionNode extends ActionNode<NotifyActionEntity> {

  run = (bridge:BridgeNode, ...args:string[]) => {
    bridge.parent.parent.notifiers[this.entity.notifier].emit("notify", this, ...args);
  };

}
