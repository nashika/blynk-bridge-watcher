import {BaseWidgetNode} from "./base-widget-node";
import {BaseWidgetNodeEntity} from "../../../common/entity/node/widget/base-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";

export class BasePinWidgetNode<T extends BaseWidgetNodeEntity> extends BaseWidgetNode<T> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
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
