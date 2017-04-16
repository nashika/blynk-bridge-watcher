import _ = require("lodash");

import {INodeEntityParams} from "../base-node-entity";
import {BaseWidgetNodeEntity} from "./base-widget-node-entity";

export abstract class BasePinWidgetNodeEntity extends BaseWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "*",
    icon: "cog",
    children: {},
    fields: _.merge({}, BasePinWidgetNodeEntity.params.fields, {
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
      initialize: {
        type: "boolean",
        default: true,
      }
    }),
  };

  pinType: string;
  pin: number;
  initialize: boolean;

}
