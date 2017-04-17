import {injectable} from "inversify";

import {NodeServerService} from "../../service/node-server-service";
import {ReadWidgetNodeEntity} from "../../../common/entity/node/widget/read-widget-node-entity";
import {BaseInputPinWidgetNode} from "./base-input-pin-widget-node";

@injectable()
export class ReadWidgetNode extends BaseInputPinWidgetNode<ReadWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async run(): Promise<void> {
    await super.run();
    this.log("debug", `Reading type=${this.entity.pinType}, pin=${this.entity.pin}.`);
    let command: string = this.pinTypeToCommand(this.entity.pinType);
    let responseValue: string;
    [responseValue] = await this.parent.request(command, this.entity.pin);
    this.log("debug", `Read result type=${this.entity.pinType}, pin=${this.entity.pin}, value=${responseValue}.`);
    let nextNodes = this.entity.next || [];
    await this.runNextNodes(nextNodes, responseValue);
  }

}
