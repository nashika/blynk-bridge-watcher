import Component from "vue-class-component";

import {BoardNodeEntity} from "../../../common/entity/node/board-node-entity";
import BaseNodeComponent from "./base-node-component";
import {BridgeNodeEntity} from "../../../common/entity/node/bridge-node-entity";
import ServerNodeComponent from "./server-node-component";

@Component({})
export default class BoardNodeComponent extends BaseNodeComponent<BoardNodeEntity> {

  parent: ServerNodeComponent;

  EntityClass = BoardNodeEntity;
  bridges: BridgeNodeEntity[] = null;

}
