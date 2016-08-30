import util = require("util");

import _ = require("lodash");

import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {LogActionEntity} from "../../../common/entity/action/log-action-entity";

export class LogActionNode extends ActionNode<LogActionEntity> {

  constructor(parent:BridgeNode, entity:LogActionEntity) {
    super(parent, entity);
    _.defaults(entity, {level: "info"});
  }

  run = (bridge:BridgeNode, ...args:string[]) => {
    bridge.log(this.entity.level, util.format(this.entity.message, ...args));
  };

}
