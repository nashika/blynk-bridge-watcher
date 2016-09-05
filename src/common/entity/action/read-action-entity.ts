import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityParams} from "../base-entity";

export class ReadActionEntity extends BaseActionEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "readAction",
    icon: "eye",
    children: {},
    fields: _.merge({}, BaseActionEntity.params.fields, {
      name: {
        default: "ACRD01",
      },
      type: {
        default: "read",
      },
      pinType: {
        type: "select",
        options: {
          digital: "digital",
          analog: "analog",
          virtual: "virtual",
        },
        default: "digital",
        required: true,
      },
      pin: {
        type: "number",
        required: true,
      },
      next: {
        type: "node",
        filter: "action",
        required: true,
      },
    }),
  };

  pinType: string;
  pin: number;
  next: string;

}
