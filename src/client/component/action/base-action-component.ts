import _ = require("lodash");

import {BaseEntityComponent} from "../base-entity-component";
import {ActionEntity} from "../../../common/entity/action-entity";
import {BaseEntity} from "../../../common/entity/base-entity";

export class BaseActionComponent extends BaseEntityComponent<ActionEntity> {

  data(): any {
    return _.merge(super.data(), {
      EntityClass: ActionEntity,
    });
  }

  get parentEntityComponent(): BaseEntityComponent<BaseEntity> {
    return this.$parent.$parent;
  }

}
