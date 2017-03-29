import {injectable} from "inversify";

import {PingBridgeNode} from "./ping-bridge-node";
import {NodeServerService} from "../../service/node-server-service";
import {TableServerService} from "../../service/table-server-service";

@injectable()
export class BridgeNode extends PingBridgeNode {

  constructor(protected tableServerService: TableServerService,
              protected nodeServerService: NodeServerService) {
    super(tableServerService, nodeServerService);
  }

}
