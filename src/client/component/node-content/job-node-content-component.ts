import Component from "vue-class-component";

import BaseNodeContentComponent from "./base-node-content-component";
import {JobNodeEntity} from "../../../common/entity/node/job-node-entity";
import ServerNodeContentComponent from "./server-node-content-component";

@Component({})
export default class JobNodeContentComponent extends BaseNodeContentComponent<JobNodeEntity> {

  parent: ServerNodeContentComponent;

  EntityClass = JobNodeEntity;

}
