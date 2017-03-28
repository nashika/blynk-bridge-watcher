import Component from "vue-class-component";

import BaseNodeComponent from "./base-node-component";
import {JobNodeEntity} from "../../../common/entity/node/job-node-entity";
import ServerNodeComponent from "./server-node-component";

@Component({})
export default class JobNodeComponent extends BaseNodeComponent<JobNodeEntity> {

  parent: ServerNodeComponent;

  EntityClass = JobNodeEntity;

}
