import {injectable} from "inversify";

import {ActionNode} from "./action-node";
import {WriteActionNodeEntity} from "../../../common/entity/node/action/write-action-node-entity";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class WriteActionNode extends ActionNode<WriteActionNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }


  run(..._args: string[]) {
    super.run();
    this.log("debug", `Write action. type=${this.entity.pinType}, pin=${this.entity.pin}, value=${this.entity.value}`);
    this.parent.write(this.entity.pinType, this.entity.pin, this.entity.value);
  };

}
