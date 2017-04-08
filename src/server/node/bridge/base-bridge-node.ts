import {WidgetBridge} from "blynk-library";

import {BaseNode} from "../base-node";
import {BoardNode} from "../board/board-node";
import {BaseWidgetNode} from "../widget/base-widget-node";
import {BridgeNodeEntity} from "../../../common/entity/node/bridge-node-entity";
import {BaseWidgetNodeEntity} from "../../../common/entity/node/widget/base-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";

export class BaseBridgeNode extends BaseNode<BridgeNodeEntity> {

  parent: BoardNode;
  widgets: BaseWidgetNode<BaseWidgetNodeEntity>[];

  protected widgetBridge: WidgetBridge;

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async connect(): Promise<void> {
    this.log("info", `Connect bridge was started.`);
    this.widgetBridge = this.parent.createNewBridge();
    this.widgetBridge.setAuthToken(this.entity.token);
  }

}
