import Component from "vue-class-component";

import {BoardEntity} from "../../../common/entity/board-entity";
import BaseNodeComponent from "./base-node-component";
import {BridgeEntity} from "../../../common/entity/bridge-entity";
import ServerNodeComponent from "./server-node-component";

@Component({})
export default class BoardNodeComponent extends BaseNodeComponent<BoardEntity> {

  parent: ServerNodeComponent;

  EntityClass = BoardEntity;
  bridges: BridgeEntity[] = null;

}
