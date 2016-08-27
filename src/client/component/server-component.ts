import Component from "vue-class-component";

import {BaseComponent} from "./base-component";
import {BoardComponent} from "./board-component";

let template = require("./server-component.jade");

@Component({
  template: template,
  components: {
    "board-component": BoardComponent,
  },
})
export class ServerComponent extends BaseComponent {

  data():any {
    return {
    }
  }

}
