import _ = require("lodash");

import {BaseNotifierNodeEntity} from "./base-notifier-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class LogNotifierNodeEntity extends BaseNotifierNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "notifier",
    subType: "log",
    icon: "terminal",
    input: "string",
    output: "none",
    children: {},
    fields: _.merge({}, BaseNotifierNodeEntity.params.fields, {}),
  };

}
