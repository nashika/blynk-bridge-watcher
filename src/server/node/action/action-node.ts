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

  connect(): void {
    this.status = "ready";
  }

  disconnect(): void {
    this.status = "error";
  }

}
