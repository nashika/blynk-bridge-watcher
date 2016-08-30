import util = require("util");

import {BaseNode} from "../base-node";
import {ServerNode} from "../server-node";
import {NotifyActionNode} from "../action/notify-action-node";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";

export abstract class NotifierNode extends BaseNode<BaseNotifierEntity> {

  static EntityClass = BaseNotifierEntity;

  public parent:ServerNode;
  protected _firstDelay:number = 3000;
  protected _nextDelay:number = 10000;
  private _waiting:boolean = false;
  private _messages:string[] = null;

  constructor(server:ServerNode, entity:BaseNotifierEntity) {
    super(server, entity);
    this._firstDelay = this._checkConfig(entity, "firstDelay", "number", this._firstDelay);
    this._nextDelay = this._checkConfig(entity, "nextDelay", "number", this._nextDelay);
    this._messages = [];
    this.on("notify", this._onNotify);
    this.on("send", this._onSend);
  }

  protected _onNotify = (action:NotifyActionNode, ...args:string[]) => {
    let message = this._makeMessage(action, ...args);
    this._messages.push(message);
    if (!this._waiting) {
      this._waiting = true;
      setTimeout(this._sendFirst, this._firstDelay);
    }
  };

  protected _onSend = (messages:string[]) => {
    this.send(messages);
  };

  protected abstract send(messages:string[]):void;

  protected _sendFirst = ():void => {
    this.emit("send", this._messages);
    this._messages = [];
    setTimeout(this._sendNext, this._nextDelay);
  };

  private _sendNext = ():void => {
    if (this._messages.length == 0)
      this._waiting = false;
    else {
      this.emit("send", this._messages);
      this._messages = [];
      setTimeout(this._sendNext, this._nextDelay);
    }
  };

  protected _makeMessage(action:NotifyActionNode, ...args:string[]):string {
    let message = action.message || "%s";
    message = action.allKeyLabel() + " " + util.format(message, ...args);
    return message;
  }

}
