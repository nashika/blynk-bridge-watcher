import {injectable} from "inversify";
import {getLogger} from "log4js";

import {NotifierNode} from "./notifier-node";
import {LogNotifierNodeEntity} from "../../../common/entity/node/notifier/log-notifier-node-entity";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class LogNotifierNode extends NotifierNode<LogNotifierNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  protected async initialize(): Promise<void> {
    this.status = "ready";
    await super.initialize();
  }

  protected send(messages: string[]) {
    let logger = getLogger("notifier");
    for (let message of messages)
      logger.info(message);
  }

}
