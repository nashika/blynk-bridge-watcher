import _ = require("lodash");
import Component from "vue-class-component";
var VueStrap = require("vue-strap");

import {BaseComponent} from "../base-component";
import {ISocketIoLogData} from "../../../common/util/socket-io-util";

let template = require("./logs-component.jade");

@Component({
  template: template,
  components: {
    modal: VueStrap.modal,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
      twoWay: true,
    },
    logs: {
      type: Array,
      required: true,
    },
  },
})
export class LogsComponent extends BaseComponent {

  show: boolean;
  logs: ISocketIoLogData[];

  data(): any {
    return _.assign(super.data(), {});
  }

}
