import Component from "vue-class-component";
import * as _ from "lodash";

import BaseInputComponent from "./base-input-component";

@Component({})
export default class NumberInputComponent extends BaseInputComponent {

  protected val_: number = 0;

  async mounted(): Promise<void> {
    await super.mounted();
    this.val_ = _.get<number>(this.entity, this.fieldName);
  }

  get val(): string {
    return _.toString(this.val_);
  }

  set val(v: string) {
    this.val_ = v === "" ? undefined : _.toNumber(v);
    _.set(this.entity, this.fieldName, this.val_);
  }

}
