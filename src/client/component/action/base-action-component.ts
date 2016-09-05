import _ = require("lodash");
import Component from "vue-class-component";

import {BaseNodeComponent} from "../base-node-component";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";

@Component({})
export class BaseActionComponent<T extends BaseActionEntity> extends BaseNodeComponent<T> {

  data(): any {
    return _.merge(super.data(), {
      EntityClass: BaseActionEntity,
    });
  }

}
