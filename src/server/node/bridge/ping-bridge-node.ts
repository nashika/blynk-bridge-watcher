import _ = require("lodash");

import {TransceiverBridgeNode} from "./transceiver-bridge-node";
import {BoardNode} from "../board-node";
import {BridgeEntity} from "../../../common/entity/bridge-entity";

export class PingBridgeNode extends TransceiverBridgeNode {

  protected _pinging:boolean = false;
  protected _pingFailureCount:number = 0;
  protected _pingIntervalId:any = 0;

  initialize():Promise<void> {
    return super.initialize().then(() => {
      _.defaults(this.entity, {pingInterval: 60000, pingLimit: 3});
      this.on("$ping", this._onPing);
      return;
    });
  }

  connect() {
    super.connect();
    this.log("info", `Ping setting, interval=${this.entity.pingInterval}ms failureLimit=${this.entity.pingLimit}`);
    setTimeout(this._ping, 1000);
    this._pingIntervalId = setInterval(this._ping, this.entity.pingInterval);
  }

  _ping = ():void => {
    this.log("debug", `Ping to bridge, waiting Pong...`);
    if (!this._pinging)
      this.send("pi", [], this._pingCallback, this._pingTimeout);
    this._pinging = true;
  };

  _pingCallback = ():void => {
    this.log("debug", `Pong from bridge.`);
    this._pinging = false;
    this.status = this.STATUS_TYPES["ready"];
    this._pingFailureCount = 0;
  };

  _pingTimeout = ():void => {
    if (this._pinging) {
      this._pingFailureCount++;
      if (this.status != this.STATUS_TYPES["error"])
        this.log("error", `Ping was no response, failure count ${this._pingFailureCount} / ${this.entity.pingLimit}.`);
      this._pinging = false;
      if (this._pingFailureCount >= this.entity.pingLimit) {
        this.log("error", `Ping failed ${this._pingFailureCount} times, the bridge will stop.`);
        this.status = this.STATUS_TYPES["error"];
      }
    }
  };

  _onPing = ():void => {
    this.log("debug", `Ping from bridge, response Pong.`);
    this.send("po", [], (...args:any[]) => {
    }, () => {
    });
  };

}
