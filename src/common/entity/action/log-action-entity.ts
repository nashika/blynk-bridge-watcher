import _ = require("lodash");

import {BaseActionEntity} from "./base-action-entity";
import {IEntityFieldParams, IEntityParams} from "../base-entity";

export class LogActionEntity extends BaseActionEntity {

  static params:IEntityParams = {
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
      },
      {
        name: "message",
        type: "text",
        required: true,
      },
    ]),
  };

  static generateDefault(): LogActionEntity {
    let result = new LogActionEntity();
    result.name = "ACLG01";
    result.type = "log";
    return result;
  }

}
