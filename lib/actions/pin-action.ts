import {Action} from "./action";
import {Bridge} from "../bridges/bridge";

export class PinAction extends Action {

  protected _pinType:string;
  protected _pin:number = -1;

  constructor(parent:Bridge, config:Object) {
    super(parent, config);
    this._pinType = this._checkConfig(config, "pinType", ["in", "digital", "analog", "virtual"]);
    this._pin = this._checkConfig(config, "pin", "number");
  }

}
