import Component from "vue-class-component";
import _ = require("lodash");

import {BaseNodeComponent} from "./base-node-component";
import {JobEntity} from "../../../common/entity/job-entity";
import {ServerNodeComponent} from "./server-node-component";

let template = require("./job-node-component.jade");

@Component({
  template: template,
})
export class JobNodeComponent extends BaseNodeComponent<JobEntity> {

  parent: ServerNodeComponent;

  data(): any {
    return _.assign(super.data(), {
      EntityClass: JobEntity,
    });
  }

}
