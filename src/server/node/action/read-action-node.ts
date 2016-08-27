import {PinActionNode} from "./pin-action-node";
import {BridgeNode} from "../bridge/bridge-node";

export class ReadActionNode extends PinActionNode {

  protected _next:string;

  constructor(parent:BridgeNode, config:Object) {
    super(parent, config);
    this._next = this._addSubAction(parent, config, "next");
  }

  run = (bridge:BridgeNode, ...args:string[]) => {
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
