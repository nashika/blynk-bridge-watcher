import Component from "vue-class-component";
import _ = require("lodash");

import {BoardEntity} from "../../common/entity/board-entity";
import {BaseNodeComponent} from "./base-node-component";
import {BridgeComponent} from "./bridge-component";
import {BridgeEntity} from "../../common/entity/bridge-entity";

let template = require("./board-component.jade");

@Component({
  template: template,
  components: {
    "bridge-component": BridgeComponent,
  },
})
export class BoardComponent extends BaseNodeComponent<BoardEntity> {

  bridges: BridgeEntity[];

  data(): any {
    return _.assign(super.data(), {
      EntityClass: BoardEntity,
      bridges: null,
    });
  }

}
