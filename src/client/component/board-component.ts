import Component from "vue-class-component";

import {BaseComponent} from "./base-component";

let template = require("./board-component.jade");

@Component({
  template: template,
  components: {
  },
})
export class BoardComponent extends BaseComponent {

  data():any {
    return {
    }
  }

}
