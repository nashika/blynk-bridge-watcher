import Component from "vue-class-component";
import * as _ from "lodash";

import BaseInputComponent from "./base-input-component";

@Component({})
export default class BooleanInputComponent extends BaseInputComponent {

  protected val_: boolean = false;

  async mounted(): Promise<void> {
    await super.mounted();
    if (_.has(this.entity, this.fieldName))
      this.val_ = _.get<boolean>(this.entity, this.fieldName);
    else
      this.val = this.field.default;
  }

  get val(): boolean {
    return this.val_;
  }

  set val(v: boolean) {
    this.val_ = v;
    _.set(this.entity, this.fieldName, this.val_);
  }

}
