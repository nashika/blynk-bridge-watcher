import _ = require("lodash");
import {injectable} from "inversify";
var Blynk = require("blynk-library");

import {BoardNodeEntity} from "../../common/entity/node/board-node-entity";
import {BaseNode} from "./base-node";
import {ServerNode} from "./server-node";
import {BridgeNode} from "./bridge/bridge-node";
import {uid} from "../../common/util/uid";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";
import {NodeService} from "../service/node-server-service";

@injectable()
export class BoardNode extends BaseNode<BoardNodeEntity> {

  SEND_TIMEOUT: number = 10000;

  parent: ServerNode;
  blynk: any;
  bridges: BridgeNode[];

  private inputVPin: any;
  private sendDeferred: {[key: string]: {resolve: (value: string[]) => void, reject: (reason: any) => void}};

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
  }


  initialize(): Promise<void> {
    _.defaults(this.entity, {addr: "", port: 8442});
    this.sendDeferred = {};
    this.log("debug", `Auth dummy blynk board was started.`);
    let options = {
      connector: new Blynk.TcpClient({
        addr: this.entity.addr,
        port: this.entity.port,
      }),
      //certs_path : './node_modules/blynk-library/certs/',
    };
    try {
      this.blynk = new Blynk.Blynk(this.entity.token, options);
    } catch (e) {
      this.log("error", e);
    }

    this.log("debug", `Construct Input Virtual Pin 0 was started.`);
    this.inputVPin = new this.blynk.VirtualPin(0);
    this.log("debug", `Construct Input Virtual Pin 0 was finished.`);
    return super.initialize().then(() => {
      this.inputVPin.on("write", this.onInputVPin);
      this.blynk.on("connect", this.onConnect);
      this.blynk.on("disconnect", this.onDisconnect);
      this.blynk.on("error", this.onError);
      return;
    });
  }

  finalize(): Promise<void> {
    this.inputVPin.removeListener("write", this.onInputVPin);
    this.blynk.removeListener("connect", this.onConnect);
    this.blynk.removeListener("disconnect", this.onDisconnect);
    this.blynk.removeListener("error", this.onError);
    return super.finalize();
  }

  private onConnect = (): void => {
    this.log("debug", `Auth dummy blynk board was finished.`);
    this.log("info", `Board ${this.entity._id} was connected.`);
    for (let bridge of this.bridges)
      bridge.connect();
    this.status = "ready";
  };

  private onDisconnect = (): void => {
    this.status = "processing";
    this.log("info", `Board ${this.entity._id} was disconnected.`);
  };

  private onError = (e: any): void => {
    this.status = "error";
    this.log("error", `Board ${this.entity._id} was error. error="${e}"`);
  };

  private onInputVPin = (param: string[]): void => {
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
      let node = this.nodeService.getNodeById(id);
      if (!node)
        return this.log("warn", `Node id='${id}' was not found.`);
      node.run(...args);
    } else {
      throw new Error(`Input data '${param[0]}' is invalid format.`);
    }
  };

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
