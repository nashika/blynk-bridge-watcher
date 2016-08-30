import Component from "vue-class-component";
import _ = require("lodash");

import {BaseEntityComponent} from "./base-entity-component";
import {BaseEntity} from "../../common/entity/base-entity";

@Component({})
export class BaseSwitchEntityComponent<T extends BaseEntity> extends BaseEntityComponent<T> {

  showAddBox:boolean;

  data(): any {
    return _.assign(super.data(), {
      showAddBox: false,
    });
  }

}
