import {injectable} from "inversify";

import {NodeServerService} from "../../service/node-server-service";
import {BaseWidgetNode} from "./base-widget-node";
import {WriteWidgetNodeEntity} from "../../../common/entity/node/widget/write-widget-node-entity";

@injectable()
export class WriteWidgetNode extends BaseWidgetNode<WriteWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async run(..._args: string[]): Promise<void> {
    await super.run();
    this.log("debug", `Writing type=${this.entity.pinType}, pin=${this.entity.pin}, value=${this.entity.value}.`);
    let command: string = this.pinTypeToCommand(this.entity.pinType);
    let args: string[] = await this.parent.request(command, this.entity.pin, this.entity.value);
    let value = args[0];
    this.log("debug", `Write result type=${this.entity.pinType}, pin=${this.entity.pin}, value=${value}.`);
  }

  private pinTypeToCommand(pinType: string): string {
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
