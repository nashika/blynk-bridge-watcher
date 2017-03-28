import {injectable} from "inversify";

import {ActionNode} from "./action-node";
import {WriteActionNodeEntity} from "../../../common/entity/node/action/write-action-node-entity";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {TableService} from "../../service/table-service";
import {NodeService} from "../../service/node-service";

@injectable()
export class WriteActionNode extends ActionNode<WriteActionNodeEntity> {

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
  }


  run(..._args: string[]) {
    super.run();
    this.log("debug", `Write action. type=${this.entity.pinType}, pin=${this.entity.pin}, value=${this.entity.value}`);
    this.parent.write(this.entity.pinType, this.entity.pin, this.entity.value);
  };

}
