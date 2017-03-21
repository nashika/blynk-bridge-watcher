import Component from "vue-class-component";

import {BaseNodeComponent} from "./base-node-component";
import {JobEntity} from "../../../common/entity/job-entity";
import {ServerNodeComponent} from "./server-node-component";

let template = require("./job-node-component.pug");

@Component({
  template: template,
})
export class JobNodeComponent extends BaseNodeComponent<JobEntity> {

  parent: ServerNodeComponent;

  EntityClass = JobEntity;

}
