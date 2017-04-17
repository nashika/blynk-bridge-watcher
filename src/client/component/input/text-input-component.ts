import * as _ from "lodash";
import Component from "vue-class-component";

import BaseInputComponent from "./base-input-component";

@Component({})
export default class TextInputComponent extends BaseInputComponent {

  private val_: string = "";

  async mounted(): Promise<void> {
    await super.mounted();
    this.val_ = _.get<string>(this.entity, this.fieldName);
  }

  get val(): string {
    return this.val_;
  }

  set val(v: string) {
    this.val_ = v;
    _.set(this.entity, this.fieldName, this.val_);
  }

}
