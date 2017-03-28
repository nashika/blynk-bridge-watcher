import Component from "vue-class-component";

import BaseNodeComponent from "../base-node-component";
import {BaseNotifierNodeEntity} from "../../../../common/entity/node/notifier/base-notifier-node-entity";
import ServerNodeComponent from "../server-node-component";

@Component({})
export default class BaseNotifierNodeComponent<T extends BaseNotifierNodeEntity> extends BaseNodeComponent<T> {

  parent: ServerNodeComponent;

  EntityClass = BaseNotifierNodeEntity;

  run() {
    this.socketIoClientService.send(this.entity._id, "Test Message");
  }

}
