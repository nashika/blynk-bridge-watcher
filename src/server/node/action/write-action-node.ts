import {PinActionNode} from "./pin-action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {ActionEntity} from "../../../common/entity/action-entity";

export class WriteActionNode extends PinActionNode {

  protected _value:number;

  constructor(parent:BridgeNode, entity:ActionEntity) {
    super(parent, entity);
    this._value = this._checkConfig(entity, "value", "number");
  }

  run = (bridge:BridgeNode, ...args:string[]) => {
    this.log("debug", `Write action. type=${this._pinType}, pin=${this._pin}, value=${this._value}`);
    bridge.write(this._pinType, this._pin, this._value);
  };

}
