import util = require("util");

import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {ActionEntity} from "../../../common/entity/action-entity";

export class LogActionNode extends ActionNode {

  protected _level:string;
  protected _message:string;

  constructor(parent:BridgeNode, entity:ActionEntity) {
    super(parent, entity);
    this._level = this._checkConfig(entity, "level", ["in", "fatal", "error", "warn", "info", "debug", "trace"], "info");
    this._message = this._checkConfig(entity, "message", "string");
  }

  run = (bridge:BridgeNode, ...args:string[]) => {
    bridge.log(this._level, util.format(this._message, ...args));
  };

}
