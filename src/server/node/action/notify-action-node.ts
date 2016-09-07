import {ActionNode} from "./action-node";
import {NotifyActionEntity} from "../../../common/entity/action/notify-action-entity";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";
import {NotifierNode} from "../notifier/notifier-node";
import {serverServiceRegistry} from "../../service/server-service-registry";

export class NotifyActionNode extends ActionNode<NotifyActionEntity> {

  run(...args:string[]) {
    super.run();
    this.log("debug", `Notify action. notifier="${this.entity.notifier}", message="${this.entity.message}", args="${JSON.stringify(args)}"`);
    let notifier = <NotifierNode<BaseNotifierEntity>>serverServiceRegistry.socketIo.getNode(this.entity.notifier);
    notifier.run(this.entity.message, ...args);
  };

}
