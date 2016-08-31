import {BaseBridgeNode} from "./base-bridge-node";
import {uid} from "../../../common/util/uid";
import {BoardNode} from "../board-node";
import {BridgeEntity} from "../../../common/entity/bridge-entity";

export class TransceiverBridgeNode extends BaseBridgeNode {

  SEND_TIMEOUT:number = 10000;

  protected _sendCallbacks:{[key:string]:(...args:string[]) => void};

  initialize():Promise<void> {
    return super.initialize().then(() => {
      this._sendCallbacks = {};
      return;
    });
  }

  send = (command:string, params:any[], callback:(...args:string[])=>void, failureCallback:()=>void):void => {
    if (command != "pi" && this.status != this.STATUS_TYPES["ready"])
      return this.log("warn", `Send command='${command}' params=${JSON.stringify(params)} can not run. Bridge status='${this.status.label}' is not ready.`);
    let pin = params[0] || 0;
    let param = params[1] || "";
    let requestId:string;
    do
      requestId = uid(3);
    while (this._sendCallbacks[requestId]);
    this._sendCallbacks[requestId] = callback;
    let output:string = `${requestId},${command},${pin},${param}`;
    setTimeout(this._sendFailureCallback, this.SEND_TIMEOUT, requestId, failureCallback, output);
    this.log("trace", `Send data='${output}'`);
    this._widgetBridge.virtualWrite(0, output);
  };

  sendCallback = (...args:string[]):void => {
    let requestId:string = args[0];
    let restArgs:string[] = args.slice(1);
    let callback:(...args:string[]) => void;
    if (!(callback = this._sendCallbacks[requestId]))
      return this.log("warn", `Request callback key='${requestId}' not found.`);
    callback(...restArgs);
    delete this._sendCallbacks[requestId];
  };

  write = (type:string, pin:number, value:number) => {
    if (this.status != this.STATUS_TYPES["ready"])
      return;
    switch (type) {
      case "digital":
        this._widgetBridge.digitalWrite(pin, value);
        break;
      case "analog":
        this._widgetBridge.analogWrite(pin, value);
        break;
      case "virtual":
        this._widgetBridge.virtualWrite(pin, value);
        break;
      default:
        throw new Error();
    }
  };

  protected _sendFailureCallback = (requestId:string, failureCallback:()=>void, output:string) => {
    if (!this._sendCallbacks[requestId])
      return;
    this.log("warn", `Request key='${requestId}' output='${output}' was timeout.`);
    delete this._sendCallbacks[requestId];
    failureCallback();
  };

}
