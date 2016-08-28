import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {ActionEntity} from "../../../common/entity/action-entity";

export class NotifyActionNode extends ActionNode {

  message:string;

  protected _notifier:string;

  constructor(parent:BridgeNode, entity:ActionEntity) {
    super(parent, entity);
    this._notifier = this._checkConfig(entity, "notifier", "string");
    this.message = this._checkConfig(entity, "message", "string");
  }

  run = (bridge:BridgeNode, ...args:string[]) => {
    bridge.parent.parent.notifiers[this._notifier].emit("notify", this, ...args);
  };

}
