import Component from "vue-class-component";

import BaseNodeContentComponent from "./base-node-content-component";
import {JobNodeEntity} from "../../../common/entity/node/job-node-entity";

@Component({})
export default class JobNodeContentComponent extends BaseNodeContentComponent<JobNodeEntity> {
}
