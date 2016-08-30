import Component from "vue-class-component";
import _ = require("lodash");

import {BaseEntityComponent} from "./base-entity-component";
import {NotifierEntity} from "../../common/entity/notifier-entity";
import {ServerComponent} from "./server-component";

let template = require("./notifier-component.jade");

@Component({
  template: template,
})
export class NotifierComponent extends BaseEntityComponent<NotifierEntity> {

  data(): any {
    return _.assign(super.data(), {
      EntityClass: NotifierEntity,
    });
  }

}
