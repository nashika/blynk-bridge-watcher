import {BaseBridgeNode} from "./base-bridge-node";
import {uid} from "../../../common/util/uid";

export class TransceiverBridgeNode extends BaseBridgeNode {

  SEND_TIMEOUT: number = 10000;

  private sendCallbacks: {[key: string]: (...args: string[]) => void};

  initialize(): Promise<void> {
    this.sendCallbacks = {};
    return super.initialize();
  }

  send = (command: string, params: any[], callback: (...args: string[])=>void, failureCallback: ()=>void): void => {
    if (command != "pi" && this.status != "ready")
      return this.log("warn", `Send command='${command}' params=${JSON.stringify(params)} can not run. Bridge status='${this.status}' is not ready.`);
    let pin = params[0] || 0;
    let param = params[1] || "";
    let requestId: string;
    do
      requestId = uid(3);
    while (this.sendCallbacks[requestId]);
    this.sendCallbacks[requestId] = callback;
    let output: string = `${requestId},${command},${pin},${param}`;
    setTimeout(this._sendFailureCallback, this.SEND_TIMEOUT, requestId, failureCallback, output);
    this.log("trace", `Send data='${output}'`);
    this.widgetBridge.virtualWrite(0, output);
  };

  sendCallback = (...args: string[]): void => {
    let requestId: string = args[0];
    let restArgs: string[] = args.slice(1);
    let callback: (...args: string[]) => void;
    if (!(callback = this.sendCallbacks[requestId]))
      return this.log("warn", `Request callback key='${requestId}' not found.`);
    callback(...restArgs);
    delete this.sendCallbacks[requestId];
  };

  write = (type: string, pin: number, value: number) => {
    if (this.status != "ready")
      return;
    switch (type) {
      case "digital":
        this.widgetBridge.digitalWrite(pin, value);
        break;
      case "analog":
        this.widgetBridge.analogWrite(pin, value);
        break;
      case "virtual":
        this.widgetBridge.virtualWrite(pin, value);
        break;
      default:
        throw new Error();
    }
  };

  protected _sendFailureCallback = (requestId: string, failureCallback: ()=>void, output: string) => {
    if (!this.sendCallbacks[requestId])
      return;
    if (this.status != "error")
      this.log("warn", `Request key='${requestId}' output='${output}' was timeout.`);
    delete this.sendCallbacks[requestId];
    failureCallback();
  };

}
