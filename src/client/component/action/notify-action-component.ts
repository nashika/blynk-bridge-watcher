import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionComponent} from "./base-action-component";
import {NotifyActionEntity} from "../../../common/entity/action/notify-action-entity";
import {serviceRegistry} from "../../service/service-registry";

let template = require("./notify-action-component.jade");

@Component({
  template: template,
})
export class NotifyActionComponent extends BaseActionComponent<NotifyActionEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: NotifyActionEntity,
    });
  }

  run() {
    serviceRegistry.socketIo.send(this.entity._id, "run");
  }

}
