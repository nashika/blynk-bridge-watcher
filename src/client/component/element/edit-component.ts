import _ = require("lodash");
import Component from "vue-class-component";

import BaseComponent from "../base-component";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {container} from "../../../common/inversify.config";
import AppComponent from "../app-component";
import {BaseNodeEntity} from "../../../common/entity/node/base-node-entity";

@Component({})
export default class EditComponent extends BaseComponent {

  $parent: AppComponent;

  protected socketIoClientService: SocketIoClientService = container.get(SocketIoClientService);

  protected EntityClass: typeof BaseNodeEntity = null;
  protected editEntity: BaseNodeEntity = null;
  protected deffered: (entity: any) => void = null;

  async edit<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, entity: T): Promise<T> {
    this.EntityClass = EntityClass;
    if (entity)
      this.editEntity = _.cloneDeep(entity);
    else
      this.editEntity = EntityClass.generateDefault<T>();
    (<any>this.$refs.modal).show();
    let result = await new Promise<T>((resolve) => {
      this.deffered = resolve;
    });
    this.EntityClass = null;
    this.editEntity = null;
    this.deffered = null;
    return result;
  }

  protected getNodeOptions(filter: string): {[_id: string]: string} {
    return this.socketIoClientService.getNodeOptions(filter);
  }

  protected ok() {
    (<any>this.$refs.modal).hide();
    this.deffered(this.editEntity);
  }

  protected cancel() {
    this.deffered(null);
  }

}
