import Component from "vue-class-component";

import {BaseNodeComponent} from "../base-node-component";
import {BaseActionEntity} from "../../../../common/entity/action/base-action-entity";

@Component({})
export class BaseActionNodeComponent<T extends BaseActionEntity> extends BaseNodeComponent<T> {

  EntityClass = BaseActionEntity;

}
