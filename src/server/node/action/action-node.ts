import _ = require("lodash");

import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {BaseActionNodeEntity} from "../../../common/entity/node/action/base-action-node-entity";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {TableService} from "../../service/table-service";
import {NodeService} from "../../service/node-server-service";

export abstract class ActionNode<T extends BaseActionNodeEntity> extends BaseNode<T> {

  parent: BridgeNode;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
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
