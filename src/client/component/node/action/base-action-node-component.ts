import Component from "vue-class-component";

import BaseNodeComponent from "../base-node-component";
import {BaseActionNodeEntity} from "../../../../common/entity/node/action/base-action-node-entity";

@Component({})
export default class BaseActionNodeComponent<T extends BaseActionNodeEntity> extends BaseNodeComponent<T> {

  EntityClass = BaseActionNodeEntity;

}
