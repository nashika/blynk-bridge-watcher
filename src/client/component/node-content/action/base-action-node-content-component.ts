import Component from "vue-class-component";

import BaseNodeContentComponent from "../base-node-content-component";
import {BaseActionNodeEntity} from "../../../../common/entity/node/action/base-action-node-entity";

@Component({})
export default class BaseActionNodeContentComponent<T extends BaseActionNodeEntity> extends BaseNodeContentComponent<T> {

  EntityClass = BaseActionNodeEntity;

}
