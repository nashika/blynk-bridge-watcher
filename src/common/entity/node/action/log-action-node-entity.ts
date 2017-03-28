import _ = require("lodash");

import {BaseActionNodeEntity} from "./base-action-node-entity";
import {TSocketIoLogLevel} from "../../../util/socket-io-util";
import {INodeEntityParams} from "../base-node-entity";

export class LogActionNodeEntity extends BaseActionNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "action",
    subType: "log",
    icon: "terminal",
    children: {},
    fields: _.merge({}, BaseActionNodeEntity.params.fields, {
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
