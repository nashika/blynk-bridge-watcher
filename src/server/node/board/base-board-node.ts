import * as _ from "lodash";
import Blynk = require("blynk-library");

import {BoardNodeEntity} from "../../../common/entity/node/board-node-entity";
import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {ServerNode} from "../server-node";
import {NodeServerService} from "../../service/node-server-service";

export class BaseBoardNode extends BaseNode<BoardNodeEntity> {

  parent: ServerNode;

  protected blynk: Blynk.Blynk;
  protected bridges: BridgeNode[];

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async initialize(): Promise<void> {
    await super.initialize();
    _.defaults(this.entity, {addr: "", port: 8442, token: ""});
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
    this.blynk.on("connect", this.onConnect);
    this.blynk.on("disconnect", this.onDisconnect);
    this.blynk.on("error", this.onError);
  }

  async finalize(): Promise<void> {
    this.blynk.removeListener("connect", this.onConnect);
    this.blynk.removeListener("disconnect", this.onDisconnect);
    this.blynk.removeListener("error", this.onError);
    await super.finalize();
  }

  private onConnect = async (): Promise<void> => {
    this.log("debug", `Auth dummy blynk board was finished.`);
    this.log("info", `Board ${this.entity._id} was connected.`);
    for (let bridge of this.bridges)
      await bridge.connect();
    this.status = "ready";
  };

  private onDisconnect = async (): Promise<void> => {
    this.status = "error";
    this.log("info", `Board ${this.entity._id} was disconnected.`);
  };

  private onError = async (e: any): Promise<void> => {
    this.status = "error";
    this.log("error", `Board ${this.entity._id} was error. error="${e}"`);
  };

}
