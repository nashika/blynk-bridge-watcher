import _ = require("lodash");

import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {TableService} from "../../service/table-service";

export abstract class ActionNode<T extends BaseActionEntity> extends BaseNode<T> {

  static EntityClass = BaseActionEntity;

  parent: BridgeNode;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
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
