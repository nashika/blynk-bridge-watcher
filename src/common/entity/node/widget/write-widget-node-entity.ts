import _ = require("lodash");

import {BaseWidgetNodeEntity} from "./base-widget-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class WriteWidgetNodeEntity extends BaseWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "write",
    icon: "pencil-square-o",
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
      value: {
        type: "number",
        required: true,
      },
    }),
  };

  pinType: string;
  pin: number;
  value: number;

}
