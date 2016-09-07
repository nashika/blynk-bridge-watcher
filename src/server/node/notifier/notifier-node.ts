import util = require("util");

import {BaseNode} from "../base-node";
import {ServerNode} from "../server-node";
import {NotifyActionNode} from "../action/notify-action-node";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";

export abstract class NotifierNode<T extends BaseNotifierEntity> extends BaseNode<T> {

  static EntityClass = BaseNotifierEntity;

  parent: ServerNode;

  private waiting: boolean = false;
  private messages: string[] = null;

  initialize(): Promise<void> {
    this.messages = [];
    return super.initialize();
  }

  run(message: string, ...args: string[]) {
    super.run();
    message = message || "%s";
    message = util.format(message, ...args);
    this.messages.push(message);
    if (!this.waiting) {
      this.waiting = true;
      setTimeout(this.sendFirst, this.entity.firstDelay);
    }
  }

  protected abstract send(messages: string[]): void;

  protected sendFirst = (): void => {
    this.send(this.messages);
    this.messages = [];
    setTimeout(this.sendNext, this.entity.nextDelay);
  };

  private sendNext = (): void => {
    if (this.messages.length == 0)
      this.waiting = false;
    else {
      this.send(this.messages);
      this.messages = [];
      setTimeout(this.sendNext, this.entity.nextDelay);
    }
  };

}
