import Component from "vue-class-component";

import BaseNotifierNodeComponent from "./base-notifier-node-component";
import {LogNotifierEntity} from "../../../../common/entity/notifier/log-notifier-entity";

@Component({})
export default class LogNotifierNodeComponent extends BaseNotifierNodeComponent<LogNotifierEntity> {

  EntityClass = LogNotifierEntity;

}
