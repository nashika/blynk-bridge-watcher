import _ = require("lodash");

import {INodeEntityParams} from "../base-node-entity";
import {BasePinWidgetNodeEntity} from "./base-pin-node-widget-entity";

export abstract class BaseOutputPinWidgetNodeEntity extends BasePinWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "*",
    icon: "cog",
    input: "none",
    output: "none",
    children: {},
    fields: _.merge({}, BasePinWidgetNodeEntity.params.fields, {
    }),
  };

}
