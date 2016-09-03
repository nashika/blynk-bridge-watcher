import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BaseNotifierEntity} from "./base-notifier-entity";

export class LogNotifierEntity extends BaseNotifierEntity {

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "logNotifier",
    icon: "terminal",
    children: {},
    fields: _.merge({}, BaseNotifierEntity.params.fields, {
      name: {
        default: "NTLG01",
      },
      type: {
        default: "log",
      },
    }),
  };

}
