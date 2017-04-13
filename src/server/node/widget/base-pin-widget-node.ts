import {BaseWidgetNode} from "./base-widget-node";
import {BasePinWidgetNodeEntity} from "../../../common/entity/node/widget/base-pin-node-widget-entity";
import {NodeServerService} from "../../service/node-server-service";

export abstract class BasePinWidgetNode<T extends BasePinWidgetNodeEntity> extends BaseWidgetNode<T> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  protected async setPinMode(mode: number): Promise<void> {
    this.log("debug", `Set pin mode started, pin=${this.entity.pin}, mode=${mode}.`);
    await this.parent.request("pm", this.entity.pin, mode);
    this.log("debug", `Set pin mode finished, pin=${this.entity.pin}, mode=${mode}.`);
  }

}
