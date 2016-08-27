import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";

export class PinActionNode extends ActionNode {

  protected _pinType:string;
  protected _pin:number = -1;

  constructor(parent:BridgeNode, config:Object) {
    super(parent, config);
    this._pinType = this._checkConfig(config, "pinType", ["in", "digital", "analog", "virtual"]);
    this._pin = this._checkConfig(config, "pin", "number");
  }

}
