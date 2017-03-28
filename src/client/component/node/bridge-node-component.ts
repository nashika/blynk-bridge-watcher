import Component from "vue-class-component";

import {BridgeNodeEntity} from "../../../common/entity/node/bridge-node-entity";
import BaseNodeComponent from "./base-node-component";
import {BaseActionNodeEntity} from "../../../common/entity/node/action/base-action-node-entity";
import BoardNodeComponent from "./board-node-component";

@Component({})
export default class BridgeNodeComponent extends BaseNodeComponent<BridgeNodeEntity> {

  parent: BoardNodeComponent;

  EntityClass = BridgeNodeEntity;
  actions: BaseActionNodeEntity[] = null;

}
