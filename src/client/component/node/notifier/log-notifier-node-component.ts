import Component from "vue-class-component";

import BaseNotifierNodeComponent from "./base-notifier-node-component";
import {LogNotifierNodeEntity} from "../../../../common/entity/node/notifier/log-notifier-node-entity";

@Component({})
export default class LogNotifierNodeComponent extends BaseNotifierNodeComponent<LogNotifierNodeEntity> {

  EntityClass = LogNotifierNodeEntity;

}
