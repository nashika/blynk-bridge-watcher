import _ = require("lodash");
import Component from "vue-class-component";

import {BaseComponent} from "../base-component";
import {BaseEntity} from "../../../common/entity/base-entity";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {container} from "../../../common/inversify.config";
import {AppComponent} from "../app-component";

let template = require("./edit-component.jade");

@Component({
  template: template,
})
export class EditComponent extends BaseComponent {

  $parent: AppComponent;

  private socketIoClientService: SocketIoClientService = container.get(SocketIoClientService);

  private EntityClass: typeof BaseEntity = null;
  private editEntity: BaseEntity = null;
  private deffered: (entity: any) => void = null;

  getNodeOptions(filter: string): {[_id: string]: string} {
    return this.socketIoClientService.getNodeOptions(filter);
  }

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

  ok() {
    this.deffered(this.editEntity);
  }

  cancel() {
    this.deffered(null);
  }

}
