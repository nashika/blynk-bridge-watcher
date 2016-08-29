import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityFieldParams, IEntityParams} from "../base-entity";

export class WriteActionEntity extends BaseActionEntity {

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
        name: "value",
        type: "number",
        required: true,
      },
    ]),
  };

  static generateDefault(): WriteActionEntity {
    let result = new WriteActionEntity();
    result.name = "ACWR01";
    result.type = "write";
    return result;
  }

}
