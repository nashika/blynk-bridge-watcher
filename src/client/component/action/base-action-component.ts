import _ = require("lodash");
import Component from "vue-class-component";

import {BaseEntityComponent} from "../base-entity-component";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";

@Component({})
export class BaseActionComponent<T extends BaseActionEntity> extends BaseEntityComponent<T> {

  data(): any {
    return _.merge(super.data(), {
      EntityClass: BaseActionEntity,
    });
  }

}
