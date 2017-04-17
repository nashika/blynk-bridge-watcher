import _ = require("lodash");

import {INodeEntityParams, TNodeEntityNextNode} from "../base-node-entity";
import {BaseInputPinWidgetNodeEntity} from "./base-input-pin-widget-node-entity";

export class ReadWidgetNodeEntity extends BaseInputPinWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "read",
    icon: "eye",
    input: "none",
    output: "integer",
    children: {},
    fields: _.merge({}, BaseInputPinWidgetNodeEntity.params.fields, {
      next: {
        type: "node",
        filter: "widget",
      },
    }),
  };

  next: TNodeEntityNextNode[];

}
