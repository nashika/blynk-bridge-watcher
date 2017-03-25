import Component from "vue-class-component";

import BaseNodeComponent from "../base-node-component";
import {BaseNotifierEntity} from "../../../../common/entity/notifier/base-notifier-entity";
import ServerNodeComponent from "../server-node-component";

@Component({})
export default class BaseNotifierNodeComponent<T extends BaseNotifierEntity> extends BaseNodeComponent<T> {

  parent: ServerNodeComponent;

  EntityClass = BaseNotifierEntity;

  run() {
    this.socketIoClientService.send(this.entity._id, "Test Message");
  }

}
