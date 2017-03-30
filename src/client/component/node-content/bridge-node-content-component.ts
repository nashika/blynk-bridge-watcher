import Component from "vue-class-component";

import {BridgeNodeEntity} from "../../../common/entity/node/bridge-node-entity";
import BaseNodeContentComponent from "./base-node-content-component";
import {BaseActionNodeEntity} from "../../../common/entity/node/action/base-action-node-entity";
import BoardNodeContentComponent from "./board-node-content-component";

@Component({})
export default class BridgeNodeContentComponent extends BaseNodeContentComponent<BridgeNodeEntity> {

  parent: BoardNodeContentComponent;

  EntityClass = BridgeNodeEntity;
  actions: BaseActionNodeEntity[] = null;

}
