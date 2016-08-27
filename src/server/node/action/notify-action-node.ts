import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";

export class NotifyActionNode extends ActionNode {

  message:string;

  protected _notifier:string;

  constructor(parent:BridgeNode, config:Object) {
    super(parent, config);
    this._notifier = this._checkConfig(config, "notifier", "string");
    this.message = this._checkConfig(config, "message", "string");
  }

  run = (bridge:BridgeNode, ...args:string[]) => {
    bridge.parent.parent.notifiers[this._notifier].emit("notify", this, ...args);
  };

}
