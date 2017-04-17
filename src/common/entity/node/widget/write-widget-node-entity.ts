import _ = require("lodash");

import {INodeEntityParams} from "../base-node-entity";
import {BaseOutputPinWidgetNodeEntity} from "./base-output-pin-widget-node-entity";

export class WriteWidgetNodeEntity extends BaseOutputPinWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "write",
    icon: "pencil-square-o",
    input: "integer",
    output: "integer",
    children: {},
    fields: _.merge({}, BaseOutputPinWidgetNodeEntity.params.fields, {
      value: {
        type: "number",
        required: true,
      },
    }),
  };

  value: number;

}
