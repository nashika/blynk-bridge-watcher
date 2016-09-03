import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BaseSwitchEntity} from "../base-switch-entity";

export class BaseActionEntity extends BaseSwitchEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "action",
    icon: "cog",
    children: {},
    fields: _.merge({}, BaseSwitchEntity.params.fields, {
      name: {
        default: "AC01",
      },
    }),
  };

}
