import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionComponent} from "./base-action-component";
import {ReadActionEntity} from "../../../common/entity/action/read-action-entity";

let template = require("./read-action-component.jade");

@Component({
  template: template,
})
export class ReadActionComponent extends BaseActionComponent<ReadActionEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: ReadActionEntity,
    });
  }

}
