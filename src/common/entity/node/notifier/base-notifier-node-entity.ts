import _ = require("lodash");

import {BaseNodeEntity, INodeEntityParams} from "../base-node-entity";
import {TSocketIoLogLevel} from "../../../util/socket-io-util";

export abstract class BaseNotifierNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "notifier",
    subType: "*",
    icon: "bell",
    input: "string",
    output: "none",
    children: {},
    fields: _.merge({}, BaseNodeEntity.params.fields, {
      firstDelay: {
        type: "number",
        default: 3000,
      },
      nextDelay: {
        type: "number",
        default: 10000,
      },
      level: {
        type: "select",
        options: {
          none: "none",
          fatal: "fatal",
          error: "error",
          warn: "warn",
          info: "info",
          debug: "debug",
          trace: "trace",
        },
        default: "none",
        required: true,
      },
    }),
  };

  firstDelay: number;
  nextDelay: number;
  level: TSocketIoLogLevel;

}
