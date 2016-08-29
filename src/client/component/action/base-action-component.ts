import _ = require("lodash");

import {BaseEntityComponent} from "../base-entity-component";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {BaseEntity} from "../../../common/entity/base-entity";

export class BaseActionComponent extends BaseEntityComponent<BaseActionEntity> {

  data(): any {
    return _.merge(super.data(), {
      EntityClass: BaseActionEntity,
    });
  }

  get parentEntityComponent(): BaseEntityComponent<BaseEntity> {
    return this.$parent.$parent;
  }

}
