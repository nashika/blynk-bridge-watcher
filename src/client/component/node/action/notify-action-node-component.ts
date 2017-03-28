import Component from "vue-class-component";

import BaseActionNodeComponent from "./base-action-node-component";
import {NotifyActionNodeEntity} from "../../../../common/entity/node/action/notify-action-node-entity";

@Component({})
export default class NotifyActionNodeComponent extends BaseActionNodeComponent<NotifyActionNodeEntity> {

  EntityClass = NotifyActionNodeEntity;

}
