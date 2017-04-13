import {NodeServerService} from "../../service/node-server-service";
import {BasePinWidgetNode} from "./base-pin-widget-node";
import {BaseOutputPinWidgetNodeEntity} from "../../../common/entity/node/widget/base-output-pin-widget-node-entity";

export abstract class BaseOutputPinWidgetNode<T extends BaseOutputPinWidgetNodeEntity> extends BasePinWidgetNode<T> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async connect(): Promise<void> {
    await this.setPinMode(BaseOutputPinWidgetNodeEntity.OUTPUT);
    await super.connect();
  }

  protected pinTypeToCommand(pinType: string): string {
    switch (pinType) {
      case "digital":
        return "dw";
      case "analog":
        return "aw";
      case "virtual":
        return "vw";
      default:
        throw new Error();
    }
  }

}
