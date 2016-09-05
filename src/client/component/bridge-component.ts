import Component from "vue-class-component";
import _ = require("lodash");

import {BridgeEntity} from "../../common/entity/bridge-entity";
import {BaseNodeComponent} from "./base-node-component";
import {BaseActionEntity} from "../../common/entity/action/base-action-entity";
import {ActionComponent} from "./action/action-component";

let template = require("./bridge-component.jade");

@Component({
  template: template,
  components: {
    "action-component": ActionComponent,
  },
})
export class BridgeComponent extends BaseNodeComponent<BridgeEntity> {

  actions:BaseActionEntity[];

  data(): any {
    return _.assign(super.data(), {
      EntityClass: BridgeEntity,
      actions: null,
    });
  }

}
