import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionNodeComponent} from "./base-action-node-component";
import {LogActionEntity} from "../../../../common/entity/action/log-action-entity";
import {serviceRegistry} from "../../../service/service-registry";

let template = require("./log-action-node-component.jade");

@Component({
  template: template,
})
export class LogActionNodeComponent extends BaseActionNodeComponent<LogActionEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: LogActionEntity,
    });
  }

  run() {
    serviceRegistry.socketIo.send(this.entity._id);
  }

}
