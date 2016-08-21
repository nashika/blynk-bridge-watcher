import util = require("util");

import {Base} from "../base";
import {Server} from "../server";
import {NotifyAction} from "../actions/notify-action";

export abstract class Notifier extends Base {

  protected _firstDelay:number = 3000;
  protected _nextDelay:number = 10000;
  private _waiting:boolean = false;
  private _messages:string[] = null;

  constructor(server:Server, config:Object) {
    super(server, config);
    this._firstDelay = this._checkConfig(config, "firstDelay", "number", this._firstDelay);
    this._nextDelay = this._checkConfig(config, "nextDelay", "number", this._nextDelay);
    this._messages = [];
    this.on("notify", this._onNotify);
    this.on("send", this._onSend);
  }

  protected _onNotify = (action:NotifyAction, ...args:string[]) => {
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

  protected _makeMessage(action:NotifyAction, ...args:string[]):string {
    let message = action.message || "%s";
    message = action.allKeyLabel() + " " + util.format(message, ...args);
    return message;
  }

}
