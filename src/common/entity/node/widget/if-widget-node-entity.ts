import _ = require("lodash");

import {BaseWidgetNodeEntity} from "./base-widget-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class IfWidgetNodeEntity extends BaseWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "if",
    icon: "code-fork",
    children: {},
    fields: _.merge({}, BaseWidgetNodeEntity.params.fields, {
      operator: {
        type: "select",
        options: {
          $eq: "=",
          $gt: ">",
          $lt: "<",
          $gte: ">=",
          $lte: "<=",
          $ne: "!=",
        },
        default: "$eq",
        required: true,
      },
      value: {
        type: "number",
        required: true,
      },
      then: {
        type: "node",
        filter: "widget",
        required: false,
      },
      else: {
        type: "node",
        filter: "widget",
        required: false,
      },
    }),
  };

  operator: string;
  value: number;
  then: string;
  else: string;

}
