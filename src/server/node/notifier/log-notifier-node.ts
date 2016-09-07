import {NotifierNode} from "./notifier-node";
import {LogNotifierEntity} from "../../../common/entity/notifier/log-notifier-entity";
import {getLogger} from "log4js";

export class LogNotifierNode extends NotifierNode<LogNotifierEntity> {

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
