import _ = require("lodash");

import {BaseWidgetNodeEntity} from "./base-widget-node-entity";
import {INodeEntityParams, INodeEntityNextNode} from "../base-node-entity";

export class IfWidgetNodeEntity extends BaseWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "if",
    icon: "code-fork",
    input: "integer",
    output: "null",
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
      },
      else: {
        type: "node",
      },
    }),
  };

  operator: string;
  value: number;
  then: INodeEntityNextNode[];
  else: INodeEntityNextNode[];

}
