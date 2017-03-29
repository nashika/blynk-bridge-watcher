import {injectable} from "inversify";

import {PingBridgeNode} from "./ping-bridge-node";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class BridgeNode extends PingBridgeNode {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

}
