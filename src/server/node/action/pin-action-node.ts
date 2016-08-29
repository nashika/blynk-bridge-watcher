import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";

export class PinActionNode extends ActionNode {

  protected _pinType:string;
  protected _pin:number = -1;

  constructor(parent:BridgeNode, entity:BaseActionEntity) {
    super(parent, entity);
    this._pinType = this._checkConfig(entity, "pinType", ["in", "digital", "analog", "virtual"]);
    this._pin = this._checkConfig(entity, "pin", "number");
  }

}
