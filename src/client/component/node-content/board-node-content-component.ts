import Component from "vue-class-component";

import {BoardNodeEntity} from "../../../common/entity/node/board-node-entity";
import BaseNodeContentComponent from "./base-node-content-component";
import {BridgeNodeEntity} from "../../../common/entity/node/bridge-node-entity";
import ServerNodeContentComponent from "./server-node-content-component";

@Component({})
export default class BoardNodeContentComponent extends BaseNodeContentComponent<BoardNodeEntity> {

  parent: ServerNodeContentComponent;

  EntityClass = BoardNodeEntity;
  bridges: BridgeNodeEntity[] = null;

}
