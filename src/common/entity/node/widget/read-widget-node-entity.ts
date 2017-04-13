import _ = require("lodash");

import {INodeEntityParams} from "../base-node-entity";
import {BaseInputPinWidgetNodeEntity} from "./base-input-pin-widget-node-entity";

export class ReadWidgetNodeEntity extends BaseInputPinWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "read",
    icon: "eye",
    children: {},
    fields: _.merge({}, BaseInputPinWidgetNodeEntity.params.fields, {
      next: {
        type: "node",
        filter: "widget",
        required: true,
      },
    }),
  };

  next: string;

}
