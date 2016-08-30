import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionComponent} from "./base-action-component";
import {WriteActionEntity} from "../../../common/entity/action/write-action-entity";

let template = require("./write-action-component.jade");

@Component({
  template: template,
})
export class WriteActionComponent extends BaseActionComponent {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: WriteActionEntity,
    });
  }

}
