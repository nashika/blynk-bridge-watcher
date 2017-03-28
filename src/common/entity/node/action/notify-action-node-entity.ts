import _ = require("lodash");

import {BaseActionNodeEntity} from "./base-action-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class NotifyActionNodeEntity extends BaseActionNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "action",
    subType: "notify",
    icon: "bell",
    children: {},
    fields: _.merge({}, BaseActionNodeEntity.params.fields, {
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
