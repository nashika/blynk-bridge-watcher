import {injectable} from "inversify";

import {ReadActionNodeEntity} from "../../../common/entity/node/action/read-action-node-entity";
import {ActionNode} from "./action-node";
import {BaseActionNodeEntity} from "../../../common/entity/node/action/base-action-node-entity";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {TableService} from "../../service/table-service";
import {NodeService} from "../../service/node-service";

@injectable()
export class ReadActionNode extends ActionNode<ReadActionNodeEntity> {

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
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
        let action = <ActionNode<BaseActionNodeEntity>>this.nodeService.getNode(this.entity.next);
        action.run(value);
      }
    });
  };

}
