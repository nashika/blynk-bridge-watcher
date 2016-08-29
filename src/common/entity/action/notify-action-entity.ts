import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityFieldParams, IEntityParams} from "../base-entity";

export class NotifyActionEntity extends BaseActionEntity {

  static defaultName = "ACNT01";
  static defaultType = "notify";

  static params: IEntityParams = {
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

}
