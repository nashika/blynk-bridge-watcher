import {ActionNode} from "./action-node";
import {NotifyActionEntity} from "../../../common/entity/action/notify-action-entity";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";
import {NotifierNode} from "../notifier/notifier-node";
import {TableService} from "../../service/table-service";
import {SocketIoServerService} from "../../service/socket-io-server-service";

export class NotifyActionNode extends ActionNode<NotifyActionEntity> {

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

  run(...args:string[]) {
    super.run();
    this.log("debug", `Notify action. notifier="${this.entity.notifier}", message="${this.entity.message}", args="${JSON.stringify(args)}"`);
    let notifier = <NotifierNode<BaseNotifierEntity>>this.socketIoServerService.getNode(this.entity.notifier);
    notifier.run(this.entity.message, ...args);
  };

}
