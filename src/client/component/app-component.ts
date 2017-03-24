import Component from "vue-class-component";

import {BaseComponent} from "./base-component";
import {ServerNodeComponent} from "./node/server-node-component";
import {ServerEntity} from "../../common/entity/server-entity";
import {EntityService} from "../service/entity-service";
import {container} from "../../common/inversify.config";
import {EditComponent} from "./element/edit-component";
import {LogsComponent} from "./element/logs-component";

let template = require("./app-component.vue");

@Component({
  template: template,
  components: {
    "server-component": ServerNodeComponent,
    "logs-component": LogsComponent,
    "edit-component": EditComponent,
  },
})
export class AppComponent extends BaseComponent {

  entityService: EntityService = container.get(EntityService);
  server: ServerEntity = null;

  get editComponent(): EditComponent {
    return <EditComponent>this.$refs.edit;
  }

  get logsComponent(): LogsComponent {
    return <LogsComponent>this.$refs.logs;
  }

  async mounted(): Promise<void> {
    let entity = await this.entityService.getOne<ServerEntity>(ServerEntity);
    this.server = entity;
  }

}
