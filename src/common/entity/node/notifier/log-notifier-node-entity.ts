import _ = require("lodash");

import {IEntityParams} from "../../base-entity";
import {BaseNotifierNodeEntity} from "./base-notifier-node-entity";

export class LogNotifierNodeEntity extends BaseNotifierNodeEntity {

  static params: IEntityParams = {
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
