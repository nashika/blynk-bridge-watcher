import _ = require("lodash");
var Blynk = require("blynk-library");

import {BoardEntity} from "../../common/entity/board-entity";
import {BaseNode} from "./base-node";
import {ServerNode} from "./server-node";
import {BridgeNode} from "./bridge/bridge-node";

export class BoardNode extends BaseNode<BoardEntity> {

  static EntityClass = BoardEntity;

  parent: ServerNode;
  blynk: any;
  bridges: {[name: string]: BridgeNode};
  private inputVPin: any;

  initialize(): Promise<void> {
    _.defaults(this.entity, {addr: "", port: 8442});
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
      this.inputVPin.on("write", this._onInputVPin);
      this.blynk.on("connect", this._onConnect);
      this.blynk.on("disconnect", this._onDisconnect);
      this.blynk.on("error", this._onError);
      return;
    });
  }

  private _onConnect = (): void => {
    this.log("debug", `Auth dummy blynk board was finished.`);
    this.log("info", `Board ${this.name} was connected.`);
    for (let bridgeName in this.bridges)
      this.bridges[bridgeName].connect();
    this.status = "ready";
  };

  private _onDisconnect = (): void => {
    this.status = "processing";
    this.log("info", `Board ${this.name} was disconnected.`);
  };

  private _onError = (e: any): void => {
    this.status = "error";
    this.log("error", `Board ${this.name} was error. error="${e}"`);
  };

  private _onInputVPin = (param: string[]): void => {
    let params = param[0].split(",");
    if (params.length < 2) {
      this.log("error", `Input data '${param}' is invalid format.`);
      return;
    }
    let bridgeName: string = params[0];
    let eventName: string = params[1];
    let eventArgs: string[] = params.splice(2);
    this.log("trace", `Receive input data, bridge='${bridgeName}' event='${eventName}' args=${JSON.stringify(eventArgs)}`);
    let bridge = this.searchBridgeFromName(bridgeName);
    if (!bridge)
      return this.log("warn", `Bridge '${bridgeName}' was not found.`);
    if (eventName == "$r")
      return bridge.sendCallback(...eventArgs);
    if (bridge.listeners(eventName).length == 0)
      return this.log("warn", `Bridge '${bridgeName}' not have '${eventName}' event.`);
    bridge.emit(eventName, bridge, ...eventArgs);
  };

  private searchBridgeFromName(name: string): BridgeNode {
    return _.find(this.bridges, {"name" : name});
  }

}
