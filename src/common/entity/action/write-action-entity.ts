import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityFieldParams, IEntityParams} from "../base-entity";

export class WriteActionEntity extends BaseActionEntity {

  static defaultName = "ACWR01";
  static defaultType = "write";

  static params: IEntityParams = {
    tableName: "board",
    entityName: "writeAction",
    icon: "pencil-square-o",
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
        default: "digital",
        required: true,
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

}
