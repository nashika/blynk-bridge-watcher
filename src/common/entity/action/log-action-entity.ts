import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityFieldParams, IEntityParams} from "../base-entity";

export class LogActionEntity extends BaseActionEntity {

  static defaultName = "ACLG01";
  static defaultType = "log";

  static params:IEntityParams = {
    tableName: "action",
    entityName: "logAction",
    icon: "terminal",
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseActionEntity.params.fields, [
      {
        name: "level",
        type: "select",
        options: {
          fatal: "fatal",
          error: "error",
          warn: "warn",
          info: "info",
          debug: "debug",
          trace: "trace",
        },
        default: "info",
        required: true,
      },
      {
        name: "message",
        type: "text",
        required: true,
      },
    ]),
  };

}
