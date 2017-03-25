import Component from "vue-class-component";

import {BridgeEntity} from "../../../common/entity/bridge-entity";
import BaseNodeComponent from "./base-node-component";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import BoardNodeComponent from "./board-node-component";

@Component({})
export default class BridgeNodeComponent extends BaseNodeComponent<BridgeEntity> {

  parent: BoardNodeComponent;

  EntityClass = BridgeEntity;
  actions: BaseActionEntity[] = null;

}
