import {BaseNode} from "./base-node";
import {BoardNode} from "./board-node";
import {NotifierNode} from "./notifier/notifier-node";
import {JobNode} from "./job-node";
import {ServerEntity} from "../../common/entity/server-entity";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

export class ServerNode extends BaseNode<ServerEntity> {

  static EntityClass = ServerEntity;

  boards: BoardNode[];
  notifiers: NotifierNode<BaseNotifierEntity>[];
  jobs: JobNode[];

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

  initialize(): Promise<void> {
    return super.initialize().then(() => {
      this.status = "ready";
    });
  }

}
