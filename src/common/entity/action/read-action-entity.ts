import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityFieldParams, IEntityParams} from "../base-entity";

export class ReadActionEntity extends BaseActionEntity {

  static defaultName = "ACRD01";
  static defaultType = "read";

  static params: IEntityParams = {
    tableName: "action",
    entityName: "readAction",
    icon: "eye",
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
        name: "next",
        type: "text",
        required: true,
      },
    ]),
  };

  pinType: string;
  pin: number;
  next: string;

}
