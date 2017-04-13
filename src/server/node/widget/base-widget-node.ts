import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {BaseWidgetNodeEntity} from "../../../common/entity/node/widget/base-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";

export abstract class BaseWidgetNode<T extends BaseWidgetNodeEntity> extends BaseNode<T> {

  parent: BridgeNode;

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async connect(): Promise<void> {
    this.status = "ready";
  }

  async disconnect(): Promise<void> {
    this.status = "error";
  }

}
