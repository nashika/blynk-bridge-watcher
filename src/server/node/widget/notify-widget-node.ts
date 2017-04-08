import {injectable} from "inversify";

import {BaseWidgetNode} from "./base-widget-node";
import {NotifyWidgetNodeEntity} from "../../../common/entity/node/widget/notify-widget-node-entity";
import {BaseNotifierNodeEntity} from "../../../common/entity/node/notifier/base-notifier-node-entity";
import {NotifierNode} from "../notifier/notifier-node";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class NotifyWidgetNode extends BaseWidgetNode<NotifyWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  run(...args:string[]) {
    super.run();
    this.log("debug", `Notify widget. notifier="${this.entity.notifier}", message="${this.entity.message}", args="${JSON.stringify(args)}"`);
    let notifier = <NotifierNode<BaseNotifierNodeEntity>>this.nodeServerService.getNodeById(this.entity.notifier);
    notifier.run(this.entity.message, ...args);
  };

}
