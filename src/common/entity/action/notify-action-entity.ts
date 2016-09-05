import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityParams} from "../base-entity";

export class NotifyActionEntity extends BaseActionEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "notifyAction",
    icon: "bell",
    children: {},
    fields: _.merge({}, BaseActionEntity.params.fields, {
      name: {
        default: "ACNT01",
      },
      type: {
        default: "notify",
      },
      notifier: {
        type: "node",
        filter: "notifier",
        required: true,
      },
      message: {
        type: "text",
        required: true,
      },
    }),
  };

  notifier: string;
  message: string;

}
