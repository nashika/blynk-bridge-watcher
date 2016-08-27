import Component from "vue-class-component";

import {BaseComponent} from "./base-component";

let template = require("./app-component.jade");

@Component({
  template: template,
  components: {
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
