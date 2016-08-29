import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityFieldParams, IEntityParams} from "../base-entity";

export class NotifyActionEntity extends BaseActionEntity {

  static params:IEntityParams = {
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseActionEntity.params.fields, [
      {
        name: "notifier",
        type: "text",
        required: true,
      },
      {
        name: "message",
        type: "text",
        required: true,
      },
    ]),
  };

  static generateDefault(): NotifyActionEntity {
    let result = new NotifyActionEntity();
    result.name = "ACNT01";
    result.type = "notify";
    return result;
  }

}
