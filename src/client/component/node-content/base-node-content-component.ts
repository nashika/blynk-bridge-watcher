import Component from "vue-class-component";

import BaseComponent from "../base-component";
import {BaseNodeEntity} from "../../../common/entity/node/base-node-entity";
import {NodeClientService} from "../../service/node-client-service";
import {container} from "../../../common/inversify.config";

@Component({
  props: {
    entity: {
      type: Object,
    },
  },
})
export default class BaseNodeContentComponent<T extends BaseNodeEntity> extends BaseComponent {

  entity: T;

  EntityClass: typeof BaseNodeEntity = BaseNodeEntity;
  protected nodeClientService: NodeClientService = container.get(NodeClientService);

}
