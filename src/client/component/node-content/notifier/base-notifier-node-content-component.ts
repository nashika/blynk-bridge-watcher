import Component from "vue-class-component";

import BaseNodeContentComponent from "../base-node-content-component";
import {BaseNotifierNodeEntity} from "../../../../common/entity/node/notifier/base-notifier-node-entity";
import ServerNodeContentComponent from "../server-node-content-component";

@Component({})
export default class BaseNotifierNodeContentComponent<T extends BaseNotifierNodeEntity> extends BaseNodeContentComponent<T> {

  parent: ServerNodeContentComponent;

  EntityClass = BaseNotifierNodeEntity;

  run() {
    this.nodeClientService.send(this.entity._id, "Test Message");
  }

}
