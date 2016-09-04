import util = require("util");

import _ = require("lodash");

import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {LogActionEntity} from "../../../common/entity/action/log-action-entity";

export class LogActionNode extends ActionNode<LogActionEntity> {

  initialize(): Promise<void> {
    _.defaults(this.entity, {level: "info"});
    return super.initialize();
  }

  run = (bridge: BridgeNode, ...args: string[]) => {
    bridge.log(this.entity.level, util.format(this.entity.message, ...args));
  };

}
