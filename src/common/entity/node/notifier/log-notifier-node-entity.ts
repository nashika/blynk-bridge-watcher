import _ = require("lodash");

import {BaseNotifierNodeEntity} from "./base-notifier-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class LogNotifierNodeEntity extends BaseNotifierNodeEntity {

  static params: INodeEntityParams = {
    tableName: "notifier",
    entityName: "logNotifier",
    icon: "terminal",
    children: {},
    fields: _.merge({}, BaseNotifierNodeEntity.params.fields, {
      type: {
        default: "log",
      },
    }),
  };

}
