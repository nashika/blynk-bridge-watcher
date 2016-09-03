import Component from "vue-class-component";

import {BaseComponent} from "./base-component";
import {ServerComponent} from "./server-component";
import {ServerEntity} from "../../common/entity/server-entity";
import {serviceRegistry} from "../service/service-registry";

let template = require("./app-component.jade");

@Component({
  template: template,
  components: {
    "server-component": ServerComponent,
  },
  ready: AppComponent.prototype.onReady,
})
export class AppComponent extends BaseComponent {

  server:ServerEntity;

  data():any {
    return {
      server: null,
    }
  }

  onReady() {
    serviceRegistry.entity.getOne(ServerEntity).then(entity => {
      this.server = entity;
      setTimeout(() => serviceRegistry.socketIo.initialize(), 3000);
    });
  }

}
