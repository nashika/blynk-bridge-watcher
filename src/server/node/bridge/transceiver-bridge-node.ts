import {BaseBridgeNode} from "./base-bridge-node";
import {NodeServerService} from "../../service/node-server-service";

export class TransceiverBridgeNode extends BaseBridgeNode {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async initialize(): Promise<void> {
    await super.initialize();
  }

  async request(command: string, pin: number = 0, param: any = ""): Promise<string[]> {
    return await new Promise<string[]>((resolve, reject) => {
      if (command != "pi" && this.status != "ready")
        return this.log("warn", `Send command='${command}', pin=${pin}, param=${JSON.stringify(param)} can not run. Bridge status='${this.status}' is not ready.`);
      let requestId = this.parent.setRequest(resolve, reject);
      let output: string = `${requestId},${command},${pin},${param}`;
      this.log("trace", `Send data='${output}'`);
      this.widgetBridge.virtualWrite(0, output);
    });
  }

}
