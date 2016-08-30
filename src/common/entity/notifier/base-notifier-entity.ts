import _ = require("lodash");

import {IEntityParams, IEntityFieldParams} from "../base-entity";
import {BaseSwitchEntity} from "../base-switch-entity";

export class BaseNotifierEntity extends BaseSwitchEntity {

  static defaultName = "NT01";

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "notifier",
    icon: "bell",
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseSwitchEntity.params.fields, [
      {
        name: "firstDelay",
        type: "number",
        default: 3000,
      },
      {
        name: "nextDelay",
        type: "number",
        default: 10000,
      },
    ]),
  };

  firstDelay: number;
  nextDelay: number;

}
