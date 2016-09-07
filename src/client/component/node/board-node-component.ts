import Component from "vue-class-component";
import _ = require("lodash");

import {BoardEntity} from "../../../common/entity/board-entity";
import {BaseNodeComponent} from "./base-node-component";
import {BridgeNodeComponent} from "./bridge-node-component";
import {BridgeEntity} from "../../../common/entity/bridge-entity";
import {ServerNodeComponent} from "./server-node-component";

let template = require("./board-node-component.jade");

@Component({
  template: template,
  components: {
    "bridge-node-component": BridgeNodeComponent,
  },
})
export class BoardNodeComponent extends BaseNodeComponent<BoardEntity> {

  parent: ServerNodeComponent;
  bridges: BridgeEntity[];

  data(): any {
    return _.assign(super.data(), {
      EntityClass: BoardEntity,
      bridges: null,
    });
  }

}
