import {PinActionNode} from "./pin-action-node";
import {BridgeNode} from "../bridge/bridge-node";

export class WriteActionNode extends PinActionNode {

  protected _value:number;

  constructor(parent:BridgeNode, config:Object) {
    super(parent, config);
    this._value = this._checkConfig(config, "value", "number");
  }

  run = (bridge:BridgeNode, ...args:string[]) => {
    this.log("debug", `Write action. type=${this._pinType}, pin=${this._pin}, value=${this._value}`);
    bridge.write(this._pinType, this._pin, this._value);
  };

}
