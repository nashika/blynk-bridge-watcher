import _ = require("lodash");

import {BaseWidgetNodeEntity} from "./base-widget-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class ReadWidgetNodeEntity extends BaseWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "read",
    icon: "eye",
    children: {},
    fields: _.merge({}, BaseWidgetNodeEntity.params.fields, {
      pinType: {
        type: "select",
        options: {
          digital: "digital",
          analog: "analog",
          virtual: "virtual",
        },
        default: "digital",
        required: true,
      },
      pin: {
        type: "number",
        required: true,
      },
      next: {
        type: "node",
        filter: "widget",
        required: true,
      },
    }),
  };

  pinType: string;
  pin: number;
  next: string;

}
