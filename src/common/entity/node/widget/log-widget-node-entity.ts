import _ = require("lodash");

import {BaseWidgetNodeEntity} from "./base-widget-node-entity";
import {TSocketIoLogLevel} from "../../../util/socket-io-util";
import {INodeEntityParams} from "../base-node-entity";

export class LogWidgetNodeEntity extends BaseWidgetNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "log",
    icon: "terminal",
    input: "null",
    output: "none",
    children: {},
    fields: _.merge({}, BaseWidgetNodeEntity.params.fields, {
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
