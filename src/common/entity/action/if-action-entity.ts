import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityParams, IEntityFieldParams} from "../base-entity";

export class IfActionEntity extends BaseActionEntity {

  static defaultName = "ACIF01";
  static defaultType = "if";

  static params:IEntityParams = {
    icon: "code-fork",
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseActionEntity.params.fields, [
      {
        name: "operator",
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
      {
        name: "value",
        type: "number",
        required: true,
      },
      {
        name: "then",
        type: "text",
      },
      {
        name: "else",
        type: "text",
      },
    ]),
  };

  operator:string;
  value:number;
  then:string;
  else:string;

}
