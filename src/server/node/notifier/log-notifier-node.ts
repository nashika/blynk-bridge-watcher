import {injectable} from "inversify";
import {getLogger} from "log4js";

import {NotifierNode} from "./notifier-node";
import {LogNotifierNodeEntity} from "../../../common/entity/node/notifier/log-notifier-node-entity";
import {NodeServerService} from "../../service/node-server-service";
import {TableServerService} from "../../service/table-server-service";

@injectable()
export class LogNotifierNode extends NotifierNode<LogNotifierNodeEntity> {

  constructor(protected tableServerService: TableServerService,
              protected nodeServerService: NodeServerService) {
    super(tableServerService, nodeServerService);
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
