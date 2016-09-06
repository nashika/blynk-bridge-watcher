import {BaseNode} from "../base-node";
import {BoardNode} from "../board-node";
import {ActionNode} from "../action/action-node";
import {BridgeEntity} from "../../../common/entity/bridge-entity";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";

export type WidgetBridge = any;

export class BaseBridgeNode extends BaseNode<BridgeEntity> {

  static EntityClass = BridgeEntity;

  parent: BoardNode;
  actions: ActionNode<BaseActionEntity>[];
  protected widgetBridge: WidgetBridge;

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
