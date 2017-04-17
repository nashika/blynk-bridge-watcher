import {injectable} from "inversify";

import {NodeServerService} from "../../service/node-server-service";
import {WriteWidgetNodeEntity} from "../../../common/entity/node/widget/write-widget-node-entity";
import {BaseOutputPinWidgetNode} from "./base-output-pin-widget-node";

@injectable()
export class WriteWidgetNode extends BaseOutputPinWidgetNode<WriteWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async run(): Promise<void> {
    await super.run();
    this.log("debug", `Writing type=${this.entity.pinType}, pin=${this.entity.pin}, value=${this.entity.value}.`);
    let command: string = this.pinTypeToCommand(this.entity.pinType);
    let responseValue: string;
    [responseValue] = await this.parent.request(command, this.entity.pin, this.entity.value);
    this.log("debug", `Write result type=${this.entity.pinType}, pin=${this.entity.pin}, value=${responseValue}.`);
  }

}
