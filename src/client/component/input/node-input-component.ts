import Component from "vue-class-component";
import * as _ from "lodash";
import * as Vue from "vue";

import BaseInputComponent from "./base-input-component";
import {NodeClientService} from "../../service/node-client-service";
import {container} from "../../../common/inversify.config";
import {INodeEntityNextNode} from "../../../common/entity/node/base-node-entity";

@Component({})
export default class NodeInputComponent extends BaseInputComponent {

  protected nodeClientService: NodeClientService = container.get(NodeClientService);

  protected val: INodeEntityNextNode[] = [];
  protected options: { text: string, value: string }[] = [];

  async mounted(): Promise<void> {
    this.options = this.nodeClientService.getNodeOptions(this.field.filter);
    this.val = _.get<INodeEntityNextNode[]>(this.entity, this.fieldName) || [];
    _.set(this.entity, this.fieldName, this.val);
  }

  protected add() {
    this.val.push({id: "", output: false, param: ""});
  }

  protected remove(index: number) {
    this.val.splice(index, 1);
  }

  protected move(index: number, direction: boolean) {
    let index1 = direction ? index : index - 1;
    let index2 = direction ? index + 1 : index;
    if (index1 < 0 || index2 >= this.val.length) return;
    this.val.splice(index1, 2, this.val[index2], this.val[index1]);
  }

  protected toggle(index: number) {
    if (this.entity.Class.params.output == 'null') return;
    Vue.set(this.val[index], "output", !this.val[index].output);
  }

}
