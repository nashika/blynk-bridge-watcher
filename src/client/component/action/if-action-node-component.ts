import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionNodeComponent} from "./base-action-node-component";
import {IfActionEntity} from "../../../common/entity/action/if-action-entity";
import {serviceRegistry} from "../../service/service-registry";

let template = require("./if-action-node-component.jade");

@Component({
  template: template,
})
export class IfActionNodeComponent extends BaseActionNodeComponent<IfActionEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: IfActionEntity,
    });
  }

  run(flag: boolean) {
    serviceRegistry.socketIo.send(this.entity._id, "run", flag);
  }

}
