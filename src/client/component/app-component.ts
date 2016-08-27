import Component from "vue-class-component";

import {BaseComponent} from "./base-component";
import {ServerComponent} from "./server-component";

let template = require("./app-component.jade");

@Component({
  template: template,
  components: {
    "server-component": ServerComponent,
  },
})
export class AppComponent extends BaseComponent {

  config:any;

  data():any {
    return {
      config: null,
    }
  }

}
