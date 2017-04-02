import {BaseBridgeNode} from "./base-bridge-node";
import {NodeServerService} from "../../service/node-server-service";

export class TransceiverBridgeNode extends BaseBridgeNode {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async initialize(): Promise<void> {
    await super.initialize();
  }

  async send(command: string, params: any[]): Promise<string[]> {
    return await new Promise<string[]>((resolve, reject) => {
      if (command != "pi" && this.status != "ready")
        return this.log("warn", `Send command='${command}' params=${JSON.stringify(params)} can not run. Bridge status='${this.status}' is not ready.`);
      let pin = params[0] || 0;
      let param = params[1] || "";
      let requestId = this.parent.setRequest(resolve, reject);
      let output: string = `${requestId},${command},${pin},${param}`;
      this.log("trace", `Send data='${output}'`);
      this.widgetBridge.virtualWrite(0, output);
    });
  }

  write(type: string, pin: number, value: number) {
    if (this.status != "ready")
      return;
    switch (type) {
      case "digital":
        this.widgetBridge.digitalWrite(pin, value);
        break;
      case "analog":
        this.widgetBridge.analogWrite(pin, value);
        break;
      case "virtual":
        this.widgetBridge.virtualWrite(pin, value);
        break;
      default:
        throw new Error();
    }
  };

}
