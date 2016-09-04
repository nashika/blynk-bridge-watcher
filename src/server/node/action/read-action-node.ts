import {BridgeNode} from "../bridge/bridge-node";
import {ReadActionEntity} from "../../../common/entity/action/read-action-entity";
import {ActionNode} from "./action-node";

export class ReadActionNode extends ActionNode<ReadActionEntity> {

  run = (...args: string[]) => {
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
    this.parent.send(command, [this.entity.pin], (...args: string[]) => {
      if (this.entity.next)
        this.parent.emit(this.entity.next, ...args);
    }, () => {
    });
  };

}
