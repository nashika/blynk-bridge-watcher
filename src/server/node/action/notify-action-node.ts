import {injectable} from "inversify";

import {ActionNode} from "./action-node";
import {NotifyActionNodeEntity} from "../../../common/entity/node/action/notify-action-node-entity";
import {BaseNotifierNodeEntity} from "../../../common/entity/node/notifier/base-notifier-node-entity";
import {NotifierNode} from "../notifier/notifier-node";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class NotifyActionNode extends ActionNode<NotifyActionNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  run(...args:string[]) {
    super.run();
    this.log("debug", `Notify action. notifier="${this.entity.notifier}", message="${this.entity.message}", args="${JSON.stringify(args)}"`);
    let notifier = <NotifierNode<BaseNotifierNodeEntity>>this.nodeServerService.getNodeById(this.entity.notifier);
    notifier.run(this.entity.message, ...args);
  };

}
