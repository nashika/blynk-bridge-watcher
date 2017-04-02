import Component from "vue-class-component";

import {BoardNodeEntity} from "../../../common/entity/node/board-node-entity";
import BaseNodeContentComponent from "./base-node-content-component";

@Component({})
export default class BoardNodeContentComponent extends BaseNodeContentComponent<BoardNodeEntity> {
}
