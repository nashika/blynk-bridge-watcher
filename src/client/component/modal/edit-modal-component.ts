import _ = require("lodash");
import Component from "vue-class-component";

import BaseComponent from "../base-component";
import {container} from "../../../common/inversify.config";
import AppComponent from "../app-component";
import {BaseNodeEntity} from "../../../common/entity/node/base-node-entity";
import {NodeClientService} from "../../service/node-client-service";

@Component({})
export default class EditModalComponent extends BaseComponent {

  $parent: AppComponent;

  protected nodeClientService: NodeClientService = container.get(NodeClientService);

  protected EntityClass: typeof BaseNodeEntity = null;
  protected entity: BaseNodeEntity = null;
  protected deffered: (entity: any) => void = null;

  async edit<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, entity: T): Promise<T> {
    this.EntityClass = EntityClass;
    if (entity)
      this.entity = _.cloneDeep(entity);
    else
      this.entity = EntityClass.generateDefault<T>();
    (<any>this.$refs.modal).show();
    let result = await new Promise<T>((resolve) => {
      this.deffered = resolve;
    });
    this.EntityClass = null;
    this.entity = null;
    this.deffered = null;
    return result;
  }

  protected submit() {
    if (this.deffered) this.deffered(this.entity);
    (<any>this.$refs.modal).hide();
  }

  protected hidden() {
    if (this.deffered) this.deffered(null);
  }

}
