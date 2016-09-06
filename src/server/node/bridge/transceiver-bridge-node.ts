import {BaseBridgeNode} from "./base-bridge-node";
import {uid} from "../../../common/util/uid";

export class TransceiverBridgeNode extends BaseBridgeNode {

  SEND_TIMEOUT: number = 10000;

  private sendCallbacks: {[key: string]: {resolve: (value: string[]) => void, reject: (reason: any) => void}};

  initialize(): Promise<void> {
    this.sendCallbacks = {};
    return super.initialize();
  }

  send(command: string, params: any[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if (command != "pi" && this.status != "ready")
        return this.log("warn", `Send command='${command}' params=${JSON.stringify(params)} can not run. Bridge status='${this.status}' is not ready.`);
      let pin = params[0] || 0;
      let param = params[1] || "";
      let requestId: string;
      do
        requestId = uid(3);
      while (this.sendCallbacks[requestId]);
      this.sendCallbacks[requestId] = {resolve: resolve, reject: reject};
      let output: string = `${requestId},${command},${pin},${param}`;
      this.log("trace", `Send data='${output}'`);
      this.widgetBridge.virtualWrite(0, output);
      setTimeout(this._sendFailureCallback, this.SEND_TIMEOUT, requestId, output);
    });
  };

  sendCallback = (...args: string[]): void => {
    let requestId: string = args[0];
    let restArgs: string[] = args.slice(1);
    if (!this.sendCallbacks[requestId])
      return this.log("warn", `Request callback key='${requestId}' not found.`);
    let resolve = this.sendCallbacks[requestId].resolve;
    delete this.sendCallbacks[requestId];
    resolve(restArgs);
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

  protected _sendFailureCallback = (requestId: string, output: string) => {
    if (!this.sendCallbacks[requestId])
      return;
    let msg = `Request key='${requestId}' output='${output}' was timeout.`;
    if (this.status != "error")
      this.log("warn", msg);
    let reject = this.sendCallbacks[requestId].reject;
    delete this.sendCallbacks[requestId];
    reject(msg);
  };

}
