import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityFieldParams, IEntityParams} from "../base-entity";

export class ReadActionEntity extends BaseActionEntity {

  static params:IEntityParams = {
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseActionEntity.params.fields, [
      {
        name: "pinType",
        type: "select",
        options: {
          digital: "digital",
          analog: "analog",
          virtual: "virtual",
        },
      },
      {
        name: "pin",
        type: "number",
        required: true,
      },
      {
        name: "next",
        type: "text",
        required: true,
      },
    ]),
  };

  static generateDefault(): ReadActionEntity {
    let result = new ReadActionEntity();
    result.name = "ACRD01";
    result.type = "read";
    return result;
  }

}
