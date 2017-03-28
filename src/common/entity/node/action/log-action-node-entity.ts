import _ = require("lodash");

import {BaseActionNodeEntity} from "./base-action-node-entity";
import {IEntityParams} from "../../base-entity";
import {TSocketIoLogLevel} from "../../../util/socket-io-util";

export class LogActionNodeEntity extends BaseActionNodeEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "logAction",
    icon: "terminal",
    children: {},
    fields: _.merge({}, BaseActionNodeEntity.params.fields, {
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
