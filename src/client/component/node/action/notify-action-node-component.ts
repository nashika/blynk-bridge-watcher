import Component from "vue-class-component";

import BaseActionNodeComponent from "./base-action-node-component";
import {NotifyActionEntity} from "../../../../common/entity/action/notify-action-entity";

@Component({})
export default class NotifyActionNodeComponent extends BaseActionNodeComponent<NotifyActionEntity> {

  EntityClass = NotifyActionEntity;

}
