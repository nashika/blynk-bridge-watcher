import Component from "vue-class-component";

import {BaseNotifierNodeComponent} from "./base-notifier-node-component";
import {LogNotifierEntity} from "../../../../common/entity/notifier/log-notifier-entity";

let template = require("./log-notifier-node-component.pug");

@Component({
  template: template,
})
export class LogNotifierNodeComponent extends BaseNotifierNodeComponent<LogNotifierEntity> {

  EntityClass = LogNotifierEntity;

}
