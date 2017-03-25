import Component from "vue-class-component";

import BaseActionNodeComponent from "./base-action-node-component";
import {LogActionEntity} from "../../../../common/entity/action/log-action-entity";

@Component({})
export default class LogActionNodeComponent extends BaseActionNodeComponent<LogActionEntity> {

  EntityClass = LogActionEntity;

}
