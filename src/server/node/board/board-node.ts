import {injectable} from "inversify";

import {NodeServerService} from "../../service/node-server-service";
import {TransceiverBoardNode} from "./transceiver-board-node";

@injectable()
export class BoardNode extends TransceiverBoardNode {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

}
