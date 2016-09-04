import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {NotifyActionEntity} from "../../../common/entity/action/notify-action-entity";

export class NotifyActionNode extends ActionNode<NotifyActionEntity> {

  run = (...args:string[]) => {
    this.parent.parent.parent.notifiers[this.entity.notifier].emit("notify", ...args);
  };

}
