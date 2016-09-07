import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BaseTypedEntity} from "../base-typed-entity";
import {TSocketIoLogLevel} from "../../util/socket-io-util";

export class BaseNotifierEntity extends BaseTypedEntity {

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "notifier",
    icon: "bell",
    children: {},
    fields: _.merge({}, BaseTypedEntity.params.fields, {
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
