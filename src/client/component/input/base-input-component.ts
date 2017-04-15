import Component from "vue-class-component";

import BaseComponent from "../base-component";
import {BaseNodeEntity, INodeEntityFieldParams} from "../../../common/entity/node/base-node-entity";

@Component({
  props: {
    entity: {
      type: Object,
    },
    fieldName: {
      type: String,
    },
    field: {
      type: Object,
    },
  },
})
export default class BaseInputComponent extends BaseComponent {

  protected entity: BaseNodeEntity;
  protected fieldName: string;
  protected field: INodeEntityFieldParams;

}
