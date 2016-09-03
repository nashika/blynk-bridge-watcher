import Component from "vue-class-component";
import _ = require("lodash");

import {BaseEntity} from "../../common/entity/base-entity";
import {BaseComponent} from "./base-component";
import {BaseEntityComponent} from "./base-entity-component";

@Component({
  props: ["entity", "brotherEntities", "parent", "add"],
})
export class BaseSwitchEntityComponent<T extends BaseEntity> extends BaseComponent {

  entity: T;
  brotherEntities: T[];
  parent: BaseEntityComponent<BaseEntity>;
  add: boolean;

  showAddBox:boolean;

  data(): any {
    return _.assign(super.data(), {
      showAddBox: false,
    });
  }

}
