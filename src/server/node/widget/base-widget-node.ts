import _ = require("lodash");

import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {BaseWidgetNodeEntity} from "../../../common/entity/node/widget/base-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";

export abstract class BaseWidgetNode<T extends BaseWidgetNodeEntity> extends BaseNode<T> {

  parent: BridgeNode;

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  protected async initialize(): Promise<void> {
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
