import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityParams, IEntityFieldParams} from "../base-entity";

export class IfActionEntity extends BaseActionEntity {

  static params:IEntityParams = {
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

  static generateDefault(): IfActionEntity {
    let result = new IfActionEntity();
    result.name = "ACIF01";
    result.type = "if";
    return result;
  }

}
