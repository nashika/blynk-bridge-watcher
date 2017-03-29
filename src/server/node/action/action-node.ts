import _ = require("lodash");

import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {BaseActionNodeEntity} from "../../../common/entity/node/action/base-action-node-entity";
import {TableServerService} from "../../service/table-server-service";
import {NodeServerService} from "../../service/node-server-service";

export abstract class ActionNode<T extends BaseActionNodeEntity> extends BaseNode<T> {

  parent: BridgeNode;

  constructor(protected tableService: TableServerService,
              protected nodeServerService: NodeServerService) {
    super(tableService, nodeServerService);
  }

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
