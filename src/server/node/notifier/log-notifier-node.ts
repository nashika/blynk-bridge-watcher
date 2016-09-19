import {injectable} from "inversify";
import {getLogger} from "log4js";

import {NotifierNode} from "./notifier-node";
import {LogNotifierEntity} from "../../../common/entity/notifier/log-notifier-entity";
import {NodeService} from "../../service/node-service";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {TableService} from "../../service/table-service";

@injectable()
export class LogNotifierNode extends NotifierNode<LogNotifierEntity> {

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
  }

  initialize(): Promise<void> {
    this.status = "ready";
    return super.initialize();
  }

  protected send(messages: string[]) {
    let logger = getLogger("notifier");
    for (let message of messages)
      logger.info(message);
  }

}
