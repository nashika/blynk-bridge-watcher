import Component from "vue-class-component";
import _ = require("lodash");

import {BaseEntityComponent} from "./base-entity-component";
import {JobEntity} from "../../common/entity/job-entity";
import {ServerComponent} from "./server-component";

let template = require("./job-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
  },
  props: ["entity", "add"],
  ready: JobComponent.prototype.onReady,
})
export class JobComponent extends BaseEntityComponent<JobEntity> {

  $parent: ServerComponent;

  data(): any {
    return _.merge(super.data(), {
      EntityClass: JobEntity,
    });
  }

}
