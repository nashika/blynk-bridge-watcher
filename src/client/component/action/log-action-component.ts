import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionComponent} from "./base-action-component";
import {LogActionEntity} from "../../../common/entity/action/log-action-entity";

let template = require("./log-action-component.jade");

@Component({
  template: template,
})
export class LogActionComponent extends BaseActionComponent<LogActionEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: LogActionEntity,
    });
  }

}
