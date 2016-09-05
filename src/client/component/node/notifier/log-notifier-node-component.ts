import Component from "vue-class-component";
import _ = require("lodash");

import {BaseNotifierNodeComponent} from "./base-notifier-node-component";
import {LogNotifierEntity} from "../../../../common/entity/notifier/log-notifier-entity";

let template = require("./log-notifier-node-component.jade");

@Component({
  template: template,
})
export class LogNotifierNodeComponent extends BaseNotifierNodeComponent<LogNotifierEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: LogNotifierEntity,
    });
  }

}
