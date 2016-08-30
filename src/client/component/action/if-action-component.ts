import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionComponent} from "./base-action-component";
import {IfActionEntity} from "../../../common/entity/action/if-action-entity";

let template = require("./if-action-component.jade");

@Component({
  template: template,
})
export class IfActionComponent extends BaseActionComponent {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: IfActionEntity,
    });
  }

}
