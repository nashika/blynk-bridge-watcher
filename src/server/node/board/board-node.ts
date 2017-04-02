import {injectable} from "inversify";
import {WidgetBridge} from "blynk-library";
import * as _ from "lodash";

import {NodeServerService} from "../../service/node-server-service";
import {TransceiverBoardNode} from "./transceiver-board-node";

@injectable()
export class BoardNode extends TransceiverBoardNode {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  createNewBridge(): WidgetBridge {
    return new this.blynk.WidgetBridge(_.size(this.bridges) + 1);
  }

}
