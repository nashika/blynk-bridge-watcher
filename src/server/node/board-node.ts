import {BoardEntity} from "../../common/entity/board-entity";
var Blynk = require("blynk-library");

import {BaseNode} from "./base-node";
import {ServerNode} from "./server-node";
import {BridgeNode} from "./bridge/bridge-node";

export class BoardNode extends BaseNode {

  static modelName = "board";

  parent:ServerNode;
  blynk:any;
  bridges:{[name:string]:BridgeNode};
  _inputVPin:any;

  constructor(parent:ServerNode, entity:BoardEntity) {
    super(parent, entity);
    let token:string = this._checkConfig(entity, "token", "string");
    let addr:string = this._checkConfig(entity, "addr", "string", "");
    let port:number = this._checkConfig(entity, "port", "number", 8442);
    this.log("debug", `Auth dummy blynk board was started.`);
    let options = {
      connector: new Blynk.TcpClient({
        addr: addr,
        port: port,
      }),
      //certs_path : './node_modules/blynk-library/certs/',
    };
    this.blynk = new Blynk.Blynk(token, options);

    this.log("debug", `Construct Input Virtual Pin 0 was started.`);
    this._inputVPin = new this.blynk.VirtualPin(0);
    this.log("debug", `Construct Input Virtual Pin 0 was finished.`);

    this.initializeChildren("bridges", BridgeNode);

    this._inputVPin.on("write", this._onInputVPin);
    this.blynk.on("connect", this._onConnect);
  }

  _onConnect = ():void => {
    this.log("debug", `Auth dummy blynk board was finished.`);
    for (let bridgeName in this.bridges)
      this.bridges[bridgeName].connect();
  };

  _onInputVPin = (param:string[]):void => {
    let params = param[0].split(",");
    if (params.length < 2) {
      this.log("error", `Input data '${param}' is invalid format.`);
      return;
    }
    let bridgeName:string = params[0];
    let eventName:string = params[1];
    let eventArgs:string[] = params.splice(2);
    this.log("trace", `Receive input data, bridge='${bridgeName}' event='${eventName}' args=${JSON.stringify(eventArgs)}`);
    if (!this.bridges[bridgeName])
      return this.log("warn", `Bridge '${bridgeName}' was not found.`);
    if (eventName == "$r")
      return this.bridges[bridgeName].sendCallback(...eventArgs);
    if (this.bridges[bridgeName].listeners(eventName).length == 0)
      return this.log("warn", `Bridge '${bridgeName}' not have '${eventName}' event.`);
    this.bridges[bridgeName].emit(eventName, this.bridges[bridgeName], ...eventArgs);
  };

}
