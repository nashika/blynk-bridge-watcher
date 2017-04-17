import _ = require("lodash");

import {BaseWidgetNodeEntity} from "./base-widget-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class NotifyWidgetNodeEntity extends BaseWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "notify",
    icon: "bell",
    input: "string",
    output: "none",
    children: {},
    fields: _.merge({}, BaseWidgetNodeEntity.params.fields, {
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
