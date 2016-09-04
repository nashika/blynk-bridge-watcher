import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionComponent} from "./base-action-component";
import {WriteActionEntity} from "../../../common/entity/action/write-action-entity";
import {serviceRegistry} from "../../service/service-registry";

let template = require("./write-action-component.jade");

@Component({
  template: template,
})
export class WriteActionComponent extends BaseActionComponent<WriteActionEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: WriteActionEntity,
    });
  }

  run() {
    serviceRegistry.socketIo.send(this.entity._id, "run");
  }

}
