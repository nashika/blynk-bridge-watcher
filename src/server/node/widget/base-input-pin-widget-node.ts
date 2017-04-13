import {NodeServerService} from "../../service/node-server-service";
import {BasePinWidgetNode} from "./base-pin-widget-node";
import {BaseInputPinWidgetNodeEntity} from "../../../common/entity/node/widget/base-input-pin-widget-node-entity";

export abstract class BaseInputPinWidgetNode<T extends BaseInputPinWidgetNodeEntity> extends BasePinWidgetNode<T> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async connect(): Promise<void> {
    await this.setPinMode(BaseInputPinWidgetNodeEntity.INPUT_PULLUP);
    await super.connect();
  }

  protected pinTypeToCommand(pinType: string): string {
    switch (pinType) {
      case "digital":
        return "dr";
      case "analog":
        return "ar";
      case "virtual":
        return "vr";
      default:
        throw new Error();
    }
  }

}
