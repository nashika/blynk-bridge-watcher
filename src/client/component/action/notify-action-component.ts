import Component from "vue-class-component";
import _ = require("lodash");
import {BaseActionComponent} from "./base-action-component";
import {ActionComponent} from "../action-component";

let template = require("./notify-action-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
  },
  props: ["entity", "add"],
  ready: NotifyActionComponent.prototype.onReady,
})
export class NotifyActionComponent extends BaseActionComponent {

  $parent: ActionComponent;

  data(): any {
    return _.merge(super.data(), {
    });
  }

  onReady() {
    super.onReady();
  }

  reload() {
    super.reload();
  }

  edit() {
    super.edit();
  }

  delete() {
    super.delete();
  }

}
