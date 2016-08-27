import util = require("util");

import {Action} from "./action";
import {Bridge} from "../bridges/bridge";

export class LogAction extends Action {

  protected _level:string;
  protected _message:string;

  constructor(parent:Bridge, config:Object) {
    super(parent, config);
    this._level = this._checkConfig(config, "level", ["in", "fatal", "error", "warn", "info", "debug", "trace"], "info");
    this._message = this._checkConfig(config, "message", "string");
  }

  run = (bridge:Bridge, ...args:string[]) => {
    bridge.log(this._level, util.format(this._message, ...args));
  };

}
