import _ = require("lodash");

import {TransceiverBridgeNode} from "./transceiver-bridge-node";

export class PingBridgeNode extends TransceiverBridgeNode {

  private pinging: boolean = false;
  private pingFailureCount: number = 0;
  private pingIntervalId: any = 0;

  initialize(): Promise<void> {
    _.defaults(this.entity, {pingInterval: 60000, pingLimit: 3});
    this.on("$ping", this.onPing);
    return super.initialize();
  }

  finalize(): Promise<void> {
    if (this.pingIntervalId) clearInterval(this.pingIntervalId);
    return super.finalize();
  }

  connect() {
    super.connect();
    this.log("info", `Ping setting, interval=${this.entity.pingInterval}ms failureLimit=${this.entity.pingLimit}`);
    setTimeout(this.ping, 1000);
    if (this.pingIntervalId) clearInterval(this.pingIntervalId);
    this.pingIntervalId = setInterval(this.ping, this.entity.pingInterval);
  }

  private ping = () => {
    this.log("debug", `Ping to bridge, waiting Pong...`);
    if (!this.pinging)
      this.send("pi", []).then(this.pingCallback).catch(this.pingTimeout);
    this.pinging = true;
  };

  private pingCallback = () => {
    this.log("debug", `Pong from bridge.`);
    this.pinging = false;
    if (this.status != "ready")
      for (let actionName in this.actions)
        this.actions[actionName].connect();
    this.status = "ready";
    this.pingFailureCount = 0;
  };

  private pingTimeout = () => {
    if (this.pinging) {
      this.pingFailureCount++;
      this.pinging = false;
      if (this.status != "error") {
        this.log("error", `Ping was no response, failure count ${this.pingFailureCount} / ${this.entity.pingLimit}.`);
        if (this.pingFailureCount >= this.entity.pingLimit) {
          this.log("error", `Ping failed ${this.pingFailureCount} times, the bridge will stop.`);
          for (let actionName in this.actions)
            this.actions[actionName].disconnect();
          this.status = "error";
        }
      }
    }
  };

  private onPing = () => {
    this.log("debug", `Ping from bridge, response Pong.`);
    this.send("po", []);
  };

}
