import _ = require("lodash");

import {IEntityParams, IEntityFieldParams} from "../base-entity";
import {BaseSwitchEntity} from "../base-switch-entity";

export class BaseNotifierEntity extends BaseSwitchEntity {

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "notifier",
    icon: "bell",
    children: {},
    fields: _.merge({}, BaseSwitchEntity.params.fields, {
      name: {
        default: "NT01",
      },
      firstDelay: {
        type: "number",
        default: 3000,
      },
      nextDelay: {
        type: "number",
        default: 10000,
      },
    }),
  };

  firstDelay: number;
  nextDelay: number;

}
