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
    setTimeout(this.ping, 1000);
    if (this.pingIntervalId) clearInterval(this.pingIntervalId);
    this.pingIntervalId = setInterval(this.ping, this.entity.pingInterval);
  }

  private ping = async (): Promise<void> => {
    if (this.pinging) return;
    this.log("debug", `Ping to bridge, waiting Pong...`);
    this.pinging = true;
    try {
      await this.send("pi", []);
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
    if (this.status != "ready")
      for (let actionName in this.widgets)
        await this.widgets[actionName].connect();
    this.status = "ready";
    this.pingFailureCount = 0;
  }

  /*private onPing = () => {
   this.log("debug", `Ping from bridge, response Pong.`);
   this.send("po", []);
   };*/

}
