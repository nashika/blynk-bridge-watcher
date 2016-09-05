import Component from "vue-class-component";
import _ = require("lodash");

import {BaseNodeComponent} from "./base-node-component";
import {JobEntity} from "../../common/entity/job-entity";
import {ServerComponent} from "./server-component";

let template = require("./job-component.jade");

@Component({
  template: template,
})
export class JobComponent extends BaseNodeComponent<JobEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: JobEntity,
    });
  }

}
