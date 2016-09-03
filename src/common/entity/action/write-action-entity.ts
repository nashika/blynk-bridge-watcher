import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityParams} from "../base-entity";

export class WriteActionEntity extends BaseActionEntity {

  static params: IEntityParams = {
    tableName: "board",
    entityName: "writeAction",
    icon: "pencil-square-o",
    children: {},
    fields: _.merge({}, BaseActionEntity.params.fields, {
      name: {
        default: "ACWR01",
      },
      type: {
        default: "write",
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
      value: {
        type: "number",
        required: true,
      },
    }),
  };

  pinType: string;
  pin: number;
  value: number;

}
