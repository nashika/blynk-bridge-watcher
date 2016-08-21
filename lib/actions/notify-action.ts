import {Action} from "./action";
import {Bridge} from "../bridges/bridge";

export class NotifyAction extends Action {

  message:string;

  protected _notifier:string;

  constructor(parent:Bridge, config:Object) {
    super(parent, config);
    this._notifier = this._checkConfig(config, "notifier", "string");
    this.message = this._checkConfig(config, "message", "string");
  }

  run = (bridge:Bridge, ...args:string[]) => {
    bridge.parent.parent.notifiers[this._notifier].emit("notify", this, ...args);
  };

}
