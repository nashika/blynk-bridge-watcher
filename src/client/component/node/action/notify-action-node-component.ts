import Component from "vue-class-component";

import {BaseActionNodeComponent} from "./base-action-node-component";
import {NotifyActionEntity} from "../../../../common/entity/action/notify-action-entity";

let template = require("./notify-action-node-component.pug");

@Component({
  template: template,
})
export class NotifyActionNodeComponent extends BaseActionNodeComponent<NotifyActionEntity> {

  EntityClass = NotifyActionEntity;

}
