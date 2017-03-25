import Component from "vue-class-component";

import {BaseEntity} from "../../../common/entity/base-entity";
import BaseComponent from "../base-component";
import BaseNodeComponent from "./base-node-component";

@Component({
  props: {
    entity: {
      type: Object,
    },
    brotherEntities: {
      type: Array,
    },
    parent: {
      type: Object,
    },
    add: {
      type: Boolean,
    },
    depth: {
      type: Number,
    },
  },
})
export default class BaseSwitchNodeComponent<T extends BaseEntity> extends BaseComponent {

  showAddBox: boolean = false;

  entity: T;
  brotherEntities: T[];
  parent: BaseNodeComponent<BaseEntity>;
  add: boolean;

}
