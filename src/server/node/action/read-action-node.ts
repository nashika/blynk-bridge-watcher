import {ReadActionEntity} from "../../../common/entity/action/read-action-entity";
import {ActionNode} from "./action-node";
import {socketIoServer} from "../../socket-io";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";

export class ReadActionNode extends ActionNode<ReadActionEntity> {

  run(...args: string[]) {
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
        let action = <ActionNode<BaseActionEntity>>socketIoServer.getNode(this.entity.next);
        action.run(value);
      }
    });
  };

}
