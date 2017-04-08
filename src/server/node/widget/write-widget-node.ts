import {injectable} from "inversify";

import {BaseWidgetNode} from "./base-widget-node";
import {WriteWidgetNodeEntity} from "../../../common/entity/node/widget/write-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class WriteWidgetNode extends BaseWidgetNode<WriteWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  run(..._args: string[]) {
    super.run();
    this.log("debug", `Write widget. type=${this.entity.pinType}, pin=${this.entity.pin}, value=${this.entity.value}`);
    this.parent.write(this.entity.pinType, this.entity.pin, this.entity.value);
  };

}
