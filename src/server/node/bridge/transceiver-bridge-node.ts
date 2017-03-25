import {BaseBridgeNode} from "./base-bridge-node";
import {NodeService} from "../../service/node-service";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {TableService} from "../../service/table-service";

export class TransceiverBridgeNode extends BaseBridgeNode {

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
  }

  initialize(): Promise<void> {
    return super.initialize();
  }

  send(command: string, params: any[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if (command != "pi" && this.status != "ready")
        return this.log("warn", `Send command='${command}' params=${JSON.stringify(params)} can not run. Bridge status='${this.status}' is not ready.`);
      let pin = params[0] || 0;
      let param = params[1] || "";
      let requestId = this.parent.setRequest(resolve, reject);
      let output: string = `${requestId},${command},${pin},${param}`;
      this.log("trace", `Send data='${output}'`);
      this.widgetBridge.virtualWrite(0, output);
    });
  };

  write = (type: string, pin: number, value: number) => {
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
