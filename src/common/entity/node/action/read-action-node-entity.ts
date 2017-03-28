import _ = require("lodash");

import {BaseActionNodeEntity} from "./base-action-node-entity";
import {IEntityParams} from "../../base-entity";

export class ReadActionNodeEntity extends BaseActionNodeEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "readAction",
    icon: "eye",
    children: {},
    fields: _.merge({}, BaseActionNodeEntity.params.fields, {
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
