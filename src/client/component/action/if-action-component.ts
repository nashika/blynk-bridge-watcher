import Component from "vue-class-component";
import _ = require("lodash");

import {BaseActionComponent} from "./base-action-component";
import {ActionComponent} from "./action-component";
import {IfActionEntity} from "../../../common/entity/action/if-action-entity";

let template = require("./if-action-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
  },
  props: ["entity", "add"],
  ready: IfActionComponent.prototype.onReady,
})
export class IfActionComponent extends BaseActionComponent {

  $parent: ActionComponent;

  data(): any {
    return _.merge(super.data(), {
      EntityClass: IfActionEntity,
    });
  }

}
