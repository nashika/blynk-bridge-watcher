import _ = require("lodash");

import {IEntityFieldParams, IEntityParams} from "../base-entity";
import {BaseNotifierEntity} from "./base-notifier-entity";

export class LogNotifierEntity extends BaseNotifierEntity {

  static defaultName = "NTLG01";
  static defaultType = "log";

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "logNotifier",
    icon: "terminal",
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseNotifierEntity.params.fields, [
    ]),
  };

}
