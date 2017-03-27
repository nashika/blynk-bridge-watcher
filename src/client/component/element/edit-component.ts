import _ = require("lodash");
import Component from "vue-class-component";

import BaseComponent from "../base-component";
import {BaseEntity} from "../../../common/entity/base-entity";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {container} from "../../../common/inversify.config";
import AppComponent from "../app-component";

@Component({})
export default class EditComponent extends BaseComponent {

  $parent: AppComponent;

  protected socketIoClientService: SocketIoClientService = container.get(SocketIoClientService);

  protected EntityClass: typeof BaseEntity = null;
  protected editEntity: BaseEntity = null;
  protected deffered: (entity: any) => void = null;

  async edit<T extends BaseEntity>(EntityClass: typeof BaseEntity, entity: T): Promise<T> {
    this.EntityClass = EntityClass;
    if (entity)
      this.editEntity = _.cloneDeep(entity);
    else
      this.editEntity = EntityClass.generateDefault();
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
