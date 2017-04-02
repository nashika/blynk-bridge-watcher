import {WidgetBridge} from "blynk-library";

import {BaseNode} from "../base-node";
import {BoardNode} from "../board/board-node";
import {ActionNode} from "../action/action-node";
import {BridgeNodeEntity} from "../../../common/entity/node/bridge-node-entity";
import {BaseActionNodeEntity} from "../../../common/entity/node/action/base-action-node-entity";
import {NodeServerService} from "../../service/node-server-service";

export class BaseBridgeNode extends BaseNode<BridgeNodeEntity> {

  parent: BoardNode;
  actions: ActionNode<BaseActionNodeEntity>[];
  protected widgetBridge: WidgetBridge;

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async initialize(): Promise<void> {
    this.log("info", `Connect bridge was started.`);
    this.widgetBridge = this.parent.createNewBridge();
    return super.initialize();
  }

  async connect(): Promise<void> {
    this.log("info", `Connection started.`);
    this.widgetBridge.setAuthToken(this.entity.token);
  }

}
