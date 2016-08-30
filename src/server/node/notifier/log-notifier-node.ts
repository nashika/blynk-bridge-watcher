import {NotifierNode} from "./notifier-node";
import {LogNotifierEntity} from "../../../common/entity/notifier/log-notifier-entity";

export class LogNotifierNode extends NotifierNode<LogNotifierEntity> {

  protected send(messages:string[]) {
    for (let message of messages)
      this.log("info", message);
  }

}
