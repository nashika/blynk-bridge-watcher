import _ = require("lodash");

import {BaseActionNodeEntity} from "./base-action-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class WriteActionNodeEntity extends BaseActionNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "action",
    subType: "write",
    icon: "pencil-square-o",
    children: {},
    fields: _.merge({}, BaseActionNodeEntity.params.fields, {
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
