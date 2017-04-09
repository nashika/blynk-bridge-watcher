import util = require("util");

import {BaseNode} from "../base-node";
import {ServerNode} from "../server-node";
import {BaseNotifierNodeEntity} from "../../../common/entity/node/notifier/base-notifier-node-entity";
import {NodeServerService} from "../../service/node-server-service";

export abstract class NotifierNode<T extends BaseNotifierNodeEntity> extends BaseNode<T> {

  parent: ServerNode;

  private waiting: boolean = false;
  private messages: string[] = null;

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  protected async initialize(): Promise<void> {
    this.messages = [];
    await super.initialize();
  }

  async run(message: string, ...args: string[]): Promise<void> {
    await super.run();
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
