import Component from "vue-class-component";
import _ = require("lodash");

import {BaseEntity} from "../../common/entity/base-entity";
import {BaseComponent} from "./base-component";
import {BaseNodeComponent} from "./base-node-component";

@Component({
  props: ["entity", "brotherEntities", "parent", "add"],
})
export class BaseSwitchNodeComponent<T extends BaseEntity> extends BaseComponent {

  entity: T;
  brotherEntities: T[];
  parent: BaseNodeComponent<BaseEntity>;
  add: boolean;

  showAddBox:boolean;

  data(): any {
    return _.assign(super.data(), {
      showAddBox: false,
    });
  }

}
