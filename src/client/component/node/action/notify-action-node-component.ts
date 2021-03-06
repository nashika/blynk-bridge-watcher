import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionNodeComponent} from "./base-action-node-component";
import {NotifyActionEntity} from "../../../../common/entity/action/notify-action-entity";

let template = require("./notify-action-node-component.jade");

@Component({
  template: template,
})
export class NotifyActionNodeComponent extends BaseActionNodeComponent<NotifyActionEntity> {

  data(): any {
    return _.assign(super.data(), {});
  }

}
