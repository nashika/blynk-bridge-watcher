import _ = require("lodash");

import {INodeEntityFieldParams, INodeEntityParams} from "../base-node-entity";
import {BasePinWidgetNodeEntity} from "./base-pin-node-widget-entity";

export abstract class BaseInputPinWidgetNodeEntity extends BasePinWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "*",
    icon: "cog",
    input: "none",
    output: "none",
    children: {},
    fields: _.merge({}, BasePinWidgetNodeEntity.params.fields, <{[name: string]: INodeEntityFieldParams}>{
      pullup: {
        type: "boolean",
        default: false,
      },
      watch: {
        type: "boolean",
        default: false,
      }
    }),
  };

  pullup: boolean;
  watch: boolean;

}
