import Component from "vue-class-component";
import _ = require("lodash");

import {BridgeEntity} from "../../common/entity/bridge-entity";
import {BaseNodeComponent} from "./base-node-component";
import {BaseActionEntity} from "../../common/entity/action/base-action-entity";
import {ActionNodeComponent} from "./action/action-node-component";
import {BoardNodeComponent} from "./board-node-component";

let template = require("./bridge-node-component.jade");

@Component({
  template: template,
  components: {
    "action-node-component": ActionNodeComponent,
  },
})
export class BridgeNodeComponent extends BaseNodeComponent<BridgeEntity> {

  parent: BoardNodeComponent;
  actions:BaseActionEntity[];

  data(): any {
    return _.assign(super.data(), {
      EntityClass: BridgeEntity,
      actions: null,
    });
  }

}
