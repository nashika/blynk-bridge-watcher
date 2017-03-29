import util = require("util");

import {BaseNode} from "../base-node";
import {ServerNode} from "../server-node";
import {BaseNotifierNodeEntity} from "../../../common/entity/node/notifier/base-notifier-node-entity";
import {NodeServerService} from "../../service/node-server-service";
import {TableServerService} from "../../service/table-server-service";

export abstract class NotifierNode<T extends BaseNotifierNodeEntity> extends BaseNode<T> {

  parent: ServerNode;

  private waiting: boolean = false;
  private messages: string[] = null;

  constructor(protected tableServerService: TableServerService,
              protected nodeServerService: NodeServerService) {
    super(tableServerService, nodeServerService);
  }

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
