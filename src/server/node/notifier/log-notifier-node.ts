import {NotifierNode} from "./notifier-node";

export class LogNotifierNode extends NotifierNode {

  protected _firstDelay:number = 0;
  protected _nextDelay:number = 0;

  protected send(messages:string[]) {
    for (let message of messages)
      this.log("info", message);
  }

}
