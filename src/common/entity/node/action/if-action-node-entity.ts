import _ = require("lodash");

import {BaseActionNodeEntity} from "./base-action-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class IfActionNodeEntity extends BaseActionNodeEntity {

  static params: INodeEntityParams = {
    tableName: "action",
    entityName: "ifAction",
    icon: "code-fork",
    children: {},
    fields: _.merge({}, BaseActionNodeEntity.params.fields, {
      type: {
        default: "if",
      },
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
        filter: "action",
        required: false,
      },
      else: {
        type: "node",
        filter: "action",
        required: false,
      },
    }),
  };

  operator: string;
  value: number;
  then: string;
  else: string;

}
