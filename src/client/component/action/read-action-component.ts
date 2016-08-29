import Component from "vue-class-component";
import _ = require("lodash");
import {BaseActionComponent} from "./base-action-component";
import {ActionComponent} from "./action-component";

let template = require("./read-action-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
  },
  props: ["entity", "add"],
  ready: ReadActionComponent.prototype.onReady,
})
export class ReadActionComponent extends BaseActionComponent {

  $parent: ActionComponent;

  data(): any {
    return _.merge(super.data(), {
    });
  }

}
