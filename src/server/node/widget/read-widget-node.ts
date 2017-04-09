import {injectable} from "inversify";

import {BaseWidgetNodeEntity} from "../../../common/entity/node/widget/base-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";
import {BasePinWidgetNode} from "./base-pin-widget-node";
import {ReadWidgetNodeEntity} from "../../../common/entity/node/widget/read-widget-node-entity";
import {BaseWidgetNode} from "./base-widget-node";

@injectable()
export class ReadWidgetNode extends BasePinWidgetNode<ReadWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async run(..._args: string[]): Promise<void> {
    await super.run();
    this.log("debug", `Read widget. type=${this.entity.pinType}, pin=${this.entity.pin}`);
    let command: string = this.pinTypeToCommand(this.entity.pinType);
    let args: string[] = await this.parent.send(command, [this.entity.pin]);
    let value = args[0];
    this.log("debug", `Read response. type=${this.entity.pinType}, pin=${this.entity.pin}, value=${value}`);
    if (this.entity.next) {
      let widget = <BaseWidgetNode<BaseWidgetNodeEntity>>this.nodeServerService.getNodeById(this.entity.next);
      await widget.run(value);
    }
  };

}
