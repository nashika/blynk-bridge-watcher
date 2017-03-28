import _ = require("lodash");

import {BaseActionNodeEntity} from "./base-action-node-entity";
import {IEntityParams} from "../../base-entity";

export class NotifyActionNodeEntity extends BaseActionNodeEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "notifyAction",
    icon: "bell",
    children: {},
    fields: _.merge({}, BaseActionNodeEntity.params.fields, {
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
