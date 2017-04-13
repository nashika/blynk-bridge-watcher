import Component from "vue-class-component";

import BaseComponent from "../base-component";
import {BaseNodeEntity, INodeEntityFieldParams} from "../../../common/entity/node/base-node-entity";

@Component({
  props: {
    editEntity: {
      type: Object,
    },
    field: {
      type: Object,
    },
  },
})
export default class BaseInputComponent extends BaseComponent {

  protected editEntity: BaseNodeEntity =  null;
  protected field: INodeEntityFieldParams = null;

}
