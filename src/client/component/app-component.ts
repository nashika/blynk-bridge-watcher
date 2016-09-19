import Component from "vue-class-component";

import {BaseComponent} from "./base-component";
import {ServerNodeComponent} from "./node/server-node-component";
import {ServerEntity} from "../../common/entity/server-entity";
import {EntityService} from "../service/entity-service";
import {kernel} from "../../common/inversify.config";

let template = require("./app-component.jade");

@Component({
  template: template,
  components: {
    "server-component": ServerNodeComponent,
  },
  ready: AppComponent.prototype.onReady,
})
export class AppComponent extends BaseComponent {

  entityService: EntityService;
  server:ServerEntity;

  data():any {
    return {
      entityService: kernel.get(EntityService),
      server: null,
    }
  }

  onReady() {
    this.entityService.getOne(ServerEntity).then(entity => {
      this.server = entity;
    });
  }

}
