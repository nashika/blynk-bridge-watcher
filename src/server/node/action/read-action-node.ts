import {injectable} from "inversify";

import {ReadActionNodeEntity} from "../../../common/entity/node/action/read-action-node-entity";
import {ActionNode} from "./action-node";
import {BaseActionNodeEntity} from "../../../common/entity/node/action/base-action-node-entity";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class ReadActionNode extends ActionNode<ReadActionNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  run(..._args: string[]) {
    super.run();
    this.log("debug", `Read action. type=${this.entity.pinType}, pin=${this.entity.pin}`);
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
        let action = <ActionNode<BaseActionNodeEntity>>this.nodeServerService.getNodeById(this.entity.next);
        action.run(value);
      }
    });
  };

}
