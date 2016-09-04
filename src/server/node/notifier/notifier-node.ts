import util = require("util");

import {BaseNode} from "../base-node";
import {ServerNode} from "../server-node";
import {NotifyActionNode} from "../action/notify-action-node";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";

export abstract class NotifierNode<T extends BaseNotifierEntity> extends BaseNode<T> {

  static EntityClass = BaseNotifierEntity;

  public parent:ServerNode;
  private _waiting:boolean = false;
  private _messages:string[] = null;

  initialize():Promise<void> {
    this._messages = [];
    this.on("notify", this._onNotify);
    this.on("send", this._onSend);
    return super.initialize();
  }

  protected _onNotify = (action:NotifyActionNode, ...args:string[]) => {
    let message = this._makeMessage(action, ...args);
    this._messages.push(message);
    if (!this._waiting) {
      this._waiting = true;
      setTimeout(this._sendFirst, this.entity.firstDelay);
    }
  };

  protected _onSend = (messages:string[]) => {
    this.send(messages);
  };

  protected abstract send(messages:string[]):void;

  protected _sendFirst = ():void => {
    this.emit("send", this._messages);
    this._messages = [];
    setTimeout(this._sendNext, this.entity.nextDelay);
  };

  private _sendNext = ():void => {
    if (this._messages.length == 0)
      this._waiting = false;
    else {
      this.emit("send", this._messages);
      this._messages = [];
      setTimeout(this._sendNext, this.entity.nextDelay);
    }
  };

  protected _makeMessage(action:NotifyActionNode, ...args:string[]):string {
    let message = action.entity.message || "%s";
    message = action.allKeyLabel() + " " + util.format(message, ...args);
    return message;
  }

}
