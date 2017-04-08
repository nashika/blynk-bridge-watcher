import {injectable} from "inversify";

import {ReadWidgetNodeEntity} from "../../../common/entity/node/widget/read-widget-node-entity";
import {BaseWidgetNode} from "./base-widget-node";
import {BaseWidgetNodeEntity} from "../../../common/entity/node/widget/base-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class ReadWidgetNode extends BaseWidgetNode<ReadWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  run(..._args: string[]) {
    super.run();
    this.log("debug", `Read widget. type=${this.entity.pinType}, pin=${this.entity.pin}`);
    let command: string;
    switch (this.entity.pinType) {
      case "digital":
        command = "dr";
        break;
      case "analog":
        command = "ar";
        break;
      case "virtual":
        command = "vr";
        break;
      default:
        throw new Error();
    }
    this.parent.send(command, [this.entity.pin]).then((args: string[]) => {
      let value = args[0];
      this.log("debug", `Read response. type=${this.entity.pinType}, pin=${this.entity.pin}, value=${value}`);
      if (this.entity.next) {
        let widget = <BaseWidgetNode<BaseWidgetNodeEntity>>this.nodeServerService.getNodeById(this.entity.next);
        widget.run(value);
      }
    });
  };

}
