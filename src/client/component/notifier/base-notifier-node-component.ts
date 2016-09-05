import _ = require("lodash");
import Component from "vue-class-component";

import {BaseNodeComponent} from "../base-node-component";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";
import {ServerNodeComponent} from "../server-node-component";

@Component({})
export class BaseNotifierNodeComponent<T extends BaseNotifierEntity> extends BaseNodeComponent<T> {

  parent: ServerNodeComponent;

  data(): any {
    return _.assign(super.data(), {
      EntityClass: BaseNotifierEntity,
    });
  }

}
