import * as _ from "lodash";
import {VirtualPin, WidgetBridge} from "blynk-library";

import {BaseBoardNode} from "./base-board-node";
import {uid} from "../../../common/util/uid";
import {NodeServerService} from "../../service/node-server-service";

export class TransceiverBoardNode extends BaseBoardNode {

  private SEND_TIMEOUT: number = 10000;

  private inputVPin: VirtualPin;
  private sendDeferred: { [key: string]: { resolve: (value: string[]) => void, reject: (reason: any) => void } };

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async initialize(): Promise<void> {
    await super.initialize();
    this.sendDeferred = {};
    this.log("debug", `Construct Input Virtual Pin 0 was started.`);
    this.inputVPin = new this.blynk.VirtualPin(0);
    this.log("debug", `Construct Input Virtual Pin 0 was finished.`);
    this.inputVPin.on("write", this.onWriteInputVPin);
  }

  async finalize(): Promise<void> {
    this.inputVPin.removeListener("write", this.onWriteInputVPin);
    await super.finalize();
  }

  private onWriteInputVPin = async (param: string[]): Promise<void> => {
    this.log("trace", `Receive data='${param[0]}'`);
    let params = param[0].split(",");
    let id: string = params[0];
    if (id.length == 3) {
      let args: string[] = params.splice(1);
      this.log("trace", `Response comming, requestId='${id}' args=${JSON.stringify(args)}`);
      this.response(id, args);
    } else if (id.length == 4) {
      let args: string[] = params.splice(1);
      this.log("trace", `Receive input data, id='${id}' args=${JSON.stringify(args)}`);
      let node = this.nodeServerService.getNodeById(id);
      if (!node)
        return this.log("warn", `Node id='${id}' was not found.`);
      node.run(...args);
    } else {
      throw new Error(`Input data '${param[0]}' is invalid format.`);
    }
  };

  createNewBridge(): WidgetBridge {
    return new this.blynk.WidgetBridge(_.size(this.bridges) + 1);
  }

  setRequest(resolve: (value: string[]) => void, reject: (reason: any) => void): string {
    let requestId: string;
    do
      requestId = uid(3);
    while (this.sendDeferred[requestId]);
    this.sendDeferred[requestId] = {resolve: resolve, reject: reject};
    setTimeout(this.requestFailure, this.SEND_TIMEOUT, requestId);
    return requestId;
  }

  protected requestFailure = (requestId: string) => {
    if (!this.sendDeferred[requestId])
      return;
    let msg = `Request key='${requestId}' was timeout.`;
    this.log("debug", msg);
    let reject = this.sendDeferred[requestId].reject;
    delete this.sendDeferred[requestId];
    reject(msg);
  };

  private response(requestId: string, args: string[]): void {
    if (!this.sendDeferred[requestId])
      return this.log("warn", `Request callback key='${requestId}' not found.`);
    let resolve = this.sendDeferred[requestId].resolve;
    delete this.sendDeferred[requestId];
    resolve(args);
  };

}
