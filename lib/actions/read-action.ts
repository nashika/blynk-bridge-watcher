import {PinAction} from "./pin-action";
import {Bridge} from "../bridges/bridge";

export class ReadAction extends PinAction {

  protected _next:string;

  constructor(parent:Bridge, config:Object) {
    super(parent, config);
    this._next = this._addSubAction(parent, config, "next");
  }

  run = (bridge:Bridge, ...args:string[]) => {
    this.log("debug", `Read action. type=${this._pinType}, pin=${this._pin}`);
    let command:string;
    switch (this._pinType) {
      case "digital":
        command = "dr";
        break;
      case "analog":
        command = "ar";
        break;
      case "virtual":
        command = "vr";
        break;
      default:
        throw new Error();
    }
    bridge.send(command, [this._pin], (...args:string[]) => {
      if (this._next)
        bridge.emit(this._next, bridge, ...args);
    }, () => {
    });
  };

}
