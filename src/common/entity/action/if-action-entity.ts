import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityParams} from "../base-entity";

export class IfActionEntity extends BaseActionEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "ifAction",
    icon: "code-fork",
    children: {},
    fields: _.merge({}, BaseActionEntity.params.fields, {
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
