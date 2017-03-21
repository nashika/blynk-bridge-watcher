import Component from "vue-class-component";

import {BoardEntity} from "../../../common/entity/board-entity";
import {BaseNodeComponent} from "./base-node-component";
import {BridgeNodeComponent} from "./bridge-node-component";
import {BridgeEntity} from "../../../common/entity/bridge-entity";
import {ServerNodeComponent} from "./server-node-component";

let template = require("./board-node-component.pug");

@Component({
  template: template,
  components: {
    "bridge-node-component": BridgeNodeComponent,
  },
})
export class BoardNodeComponent extends BaseNodeComponent<BoardEntity> {

  parent: ServerNodeComponent;

  EntityClass = BoardEntity;
  bridges: BridgeEntity[] = null;

}
