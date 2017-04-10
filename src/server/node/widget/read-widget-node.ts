import {injectable} from "inversify";

import {BaseWidgetNodeEntity} from "../../../common/entity/node/widget/base-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";
import {ReadWidgetNodeEntity} from "../../../common/entity/node/widget/read-widget-node-entity";
import {BaseWidgetNode} from "./base-widget-node";

@injectable()
export class ReadWidgetNode extends BaseWidgetNode<ReadWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async run(..._args: string[]): Promise<void> {
    await super.run();
    this.log("debug", `Reading type=${this.entity.pinType}, pin=${this.entity.pin}.`);
    let command: string = this.pinTypeToCommand(this.entity.pinType);
    let args: string[] = await this.parent.request(command, this.entity.pin);
    let value = args[0];
    this.log("debug", `Read result type=${this.entity.pinType}, pin=${this.entity.pin}, value=${value}.`);
    if (this.entity.next) {
      let widget = <BaseWidgetNode<BaseWidgetNodeEntity>>this.nodeServerService.getNodeById(this.entity.next);
      await widget.run(value);
    }
  }

  private pinTypeToCommand(pinType: string): string {
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
