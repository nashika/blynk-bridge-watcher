import Component from "vue-class-component";
import * as _ from "lodash";

import BaseInputComponent from "./base-input-component";
import {NodeClientService} from "../../service/node-client-service";
import {container} from "../../../common/inversify.config";
import {TNodeEntityNextNode} from "../../../common/entity/node/base-node-entity";

@Component({})
export default class NodeInputComponent extends BaseInputComponent {

  protected nodeClientService: NodeClientService = container.get(NodeClientService);

  protected val: TNodeEntityNextNode[] = [];
  protected options: { [_id: string]: string } = null;

  async mounted(): Promise<void> {
    this.options = this.nodeClientService.getNodeOptions(this.field.filter);
    this.val = _.get<TNodeEntityNextNode[]>(this.entity, this.fieldName) || [];
  }

  protected add() {
    this.val.push({id: "", param: ""});
  }

  protected remove(index: number) {
    this.val = _.drop(this.val, index);
  }

  protected move(index: number, direction: boolean) {
    let index1 = direction ? index : index - 1;
    let index2 = direction ? index + 1 : index;
    if (index1 < 0 || index2 >= this.val.length) return;
    this.val.splice(index1, 2, this.val[index2], this.val[index1]);
  }

}
