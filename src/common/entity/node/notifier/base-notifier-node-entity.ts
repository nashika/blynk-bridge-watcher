import _ = require("lodash");

import {IEntityParams} from "../../base-entity";
import {BaseNodeEntity} from "../base-node-entity";
import {TSocketIoLogLevel} from "../../../util/socket-io-util";

export abstract class BaseNotifierNodeEntity extends BaseNodeEntity {

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "notifier",
    icon: "bell",
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
