import util = require("util");

import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";

export class LogActionNode extends ActionNode {

  protected _level:string;
  protected _message:string;

  constructor(parent:BridgeNode, config:Object) {
    super(parent, config);
    this._level = this._checkConfig(config, "level", ["in", "fatal", "error", "warn", "info", "debug", "trace"], "info");
    this._message = this._checkConfig(config, "message", "string");
  }

  run = (bridge:BridgeNode, ...args:string[]) => {
    bridge.log(this._level, util.format(this._message, ...args));
  };

}
