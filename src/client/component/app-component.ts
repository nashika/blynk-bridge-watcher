import Component from "vue-class-component";

import BaseComponent from "./base-component";
import {ServerNodeEntity} from "../../common/entity/node/server-node-entity";
import {NodeClientService} from "../service/node-client-service";
import {container} from "../../common/inversify.config";
import EditComponent from "./element/edit-component";
import LogsComponent from "./element/logs-component";
import {SocketIoClientService} from "../service/socket-io-client-service";

@Component({})
export default class AppComponent extends BaseComponent {

  protected nodeClientService: NodeClientService = container.get(NodeClientService);
  protected socketIoClientService: SocketIoClientService = container.get(SocketIoClientService);

  protected server: ServerNodeEntity = null;

  get editComponent(): EditComponent {
    return <EditComponent>this.$refs.edit;
  }

  get logsComponent(): LogsComponent {
    return <LogsComponent>this.$refs.logs;
  }

  async mounted(): Promise<void> {
    await this.socketIoClientService.initialize();
    await this.nodeClientService.initialize();
    let entity = await this.nodeClientService.findOne<ServerNodeEntity>(ServerNodeEntity);
    this.server = entity;
  }

}
