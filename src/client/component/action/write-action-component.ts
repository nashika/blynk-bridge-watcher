import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionComponent} from "./base-action-component";
import {ActionComponent} from "./action-component";
import {WriteActionEntity} from "../../../common/entity/action/write-action-entity";

let template = require("./write-action-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
  },
  props: ["entity", "add"],
  ready: WriteActionComponent.prototype.onReady,
})
export class WriteActionComponent extends BaseActionComponent {

  $parent: ActionComponent;

  data(): any {
    return _.merge(super.data(), {
      EntityClass: WriteActionEntity,
    });
  }

}
