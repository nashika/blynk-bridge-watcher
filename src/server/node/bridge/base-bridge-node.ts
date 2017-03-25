import {BaseNode} from "../base-node";
import {BoardNode} from "../board-node";
import {ActionNode} from "../action/action-node";
import {BridgeEntity} from "../../../common/entity/bridge-entity";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {TableService} from "../../service/table-service";
import {NodeService} from "../../service/node-service";

export type WidgetBridge = any;

export class BaseBridgeNode extends BaseNode<BridgeEntity> {

  parent: BoardNode;
  actions: ActionNode<BaseActionEntity>[];
  protected widgetBridge: WidgetBridge;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
  }

  initialize(): Promise<void> {
    this.log("info", `Connect bridge was started.`);
    this.widgetBridge = new this.parent.blynk.WidgetBridge(Object.keys(this.parent.bridges).length + 1);
    return super.initialize();
  }

  connect() {
    this.log("info", `Connection started.`);
    this.widgetBridge.setAuthToken(this.entity.token);
  }

}
