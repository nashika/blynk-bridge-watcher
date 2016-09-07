import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityParams} from "../base-entity";
import {TSocketIoLogLevel} from "../../util/socket-io-util";

export class LogActionEntity extends BaseActionEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "logAction",
    icon: "terminal",
    children: {},
    fields: _.merge({}, BaseActionEntity.params.fields, {
      type: {
        default: "log",
      },
      level: {
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
      message: {
        type: "text",
        required: true,
      },
    }),
  };

  level: TSocketIoLogLevel;
  message: string;

}
