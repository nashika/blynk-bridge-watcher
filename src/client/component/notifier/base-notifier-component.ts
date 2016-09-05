import _ = require("lodash");
import Component from "vue-class-component";

import {BaseNodeComponent} from "../base-node-component";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";

@Component({})
export class BaseNotifierComponent<T extends BaseNotifierEntity> extends BaseNodeComponent<T> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: BaseNotifierEntity,
    });
  }

}
