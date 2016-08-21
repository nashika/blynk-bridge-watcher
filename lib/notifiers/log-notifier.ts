import {Notifier} from "./notifier";

export class LogNotifier extends Notifier {

  protected _firstDelay:number = 0;
  protected _nextDelay:number = 0;

  protected _onSend = (messages:string[]) => {
    for (let message of messages)
      this.log("info", message);
  };

}
