import _ = require("lodash");

import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {BaseActionNodeEntity} from "../../../common/entity/node/action/base-action-node-entity";
import {NodeServerService} from "../../service/node-server-service";

export abstract class ActionNode<T extends BaseActionNodeEntity> extends BaseNode<T> {

  parent: BridgeNode;

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async initialize(): Promise<void> {
    _.defaults(this.entity, {aliases: []});
    await super.initialize();
  }

  async connect(): Promise<void> {
    this.status = "ready";
  }

  async disconnect(): Promise<void> {
    this.status = "error";
  }

}
