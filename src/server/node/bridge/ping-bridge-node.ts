import _ = require("lodash");

import {TransceiverBridgeNode} from "./transceiver-bridge-node";
import {NodeServerService} from "../../service/node-server-service";

export class PingBridgeNode extends TransceiverBridgeNode {

  private pinging: boolean = false;
  private pingFailureCount: number = 0;
  private pingIntervalId: any = 0;

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async initialize(): Promise<void> {
    _.defaults(this.entity, {pingInterval: 60000, pingLimit: 3});
    return await super.initialize();
  }

  async finalize(): Promise<void> {
    if (this.pingIntervalId) clearInterval(this.pingIntervalId);
    return await super.finalize();
  }

  async connect(): Promise<void> {
    await super.connect();
    this.log("info", `Ping setting, interval=${this.entity.pingInterval}ms failureLimit=${this.entity.pingLimit}`);
    this.log("info", `Connect bridge started, id=${this.entity._id}`);
    try {
      await this.request("co", 0, this.entity._id);
    } catch (_e) {
      this.log("error", `Connect bridge failed, id=${this.entity._id}`);
      this.status = "error";
    }
    this.log("info", `Connect bridge succeed, id=${this.entity._id}`);
    this.status = "ready";
    for (let actionName in this.widgets)
      await this.widgets[actionName].connect();
    if (this.pingIntervalId) clearInterval(this.pingIntervalId);
    this.pingIntervalId = setInterval(() => this.ping(), this.entity.pingInterval);
  }

  private async ping(): Promise<void> {
    if (this.pinging) return;
    this.log("debug", `Ping to bridge, waiting Pong...`);
    this.pinging = true;
    try {
      await this.request("pi");
    } catch (_e) {
      if (this.pinging) {
        this.pingFailureCount++;
        this.pinging = false;
        if (this.status != "error") {
          this.log("warn", `Ping was no response, failure count ${this.pingFailureCount} / ${this.entity.pingLimit}.`);
          if (this.pingFailureCount >= this.entity.pingLimit) {
            this.log("error", `Ping failed ${this.pingFailureCount} times, the bridge will stop.`);
            for (let widgetName in this.widgets)
              await this.widgets[widgetName].disconnect();
            this.status = "error";
          }
        }
      }
      return;
    }
    this.log("debug", `Pong from bridge.`);
    this.pinging = false;
    this.pingFailureCount = 0;
    if (this.status != "ready")
      await this.connect();
  }

  /*private onPing = () => {
   this.log("debug", `Ping from bridge, response Pong.`);
   this.send("po", []);
   };*/

}
