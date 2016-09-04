import _ = require("lodash");

import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {BaseEntity} from "../../../common/entity/base-entity";

export abstract class ActionNode<T extends BaseActionEntity> extends BaseNode<T> {

  static EntityClass = BaseActionEntity;

  parent: BridgeNode;

  initialize(): Promise<void> {
    _.defaults(this.entity, {aliases: []});
    return super.initialize();
  }

  run = (caller: BaseNode<BaseEntity>, ...args: string[]) => {
    this.log("error", `Action.run is abstract function`);
  };

}
