import Component from "vue-class-component";

import BaseActionNodeComponent from "./base-action-node-component";
import {LogActionNodeEntity} from "../../../../common/entity/node/action/log-action-node-entity";

@Component({})
export default class LogActionNodeComponent extends BaseActionNodeComponent<LogActionNodeEntity> {

  EntityClass = LogActionNodeEntity;

}
