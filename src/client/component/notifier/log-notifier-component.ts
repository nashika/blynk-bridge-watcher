import Component from "vue-class-component";
import _ = require("lodash");

import {BaseNotifierComponent} from "./base-notifier-component";
import {LogNotifierEntity} from "../../../common/entity/notifier/log-notifier-entity";

let template = require("./log-notifier-component.jade");

@Component({
  template: template,
})
export class LogNotifierComponent extends BaseNotifierComponent<LogNotifierEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: LogNotifierEntity,
    });
  }

}
