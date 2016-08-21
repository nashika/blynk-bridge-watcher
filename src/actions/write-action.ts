import {PinAction} from "./pin-action";
import {Bridge} from "../bridges/bridge";

export class WriteAction extends PinAction {

  protected _value:number;

  constructor(parent:Bridge, config:Object) {
    super(parent, config);
    this._value = this._checkConfig(config, "value", "number");
  }

  run = (bridge:Bridge, ...args:string[]) => {
    this.log("debug", `Write action. type=${this._pinType}, pin=${this._pin}, value=${this._value}`);
    bridge.write(this._pinType, this._pin, this._value);
  };

}
