import {ActionNode} from "./action-node";
import {WriteActionEntity} from "../../../common/entity/action/write-action-entity";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {TableService} from "../../service/table-service";

export class WriteActionNode extends ActionNode<WriteActionEntity> {

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

  run(...args: string[]) {
    super.run();
    this.log("debug", `Write action. type=${this.entity.pinType}, pin=${this.entity.pin}, value=${this.entity.value}`);
    this.parent.write(this.entity.pinType, this.entity.pin, this.entity.value);
  };

}
