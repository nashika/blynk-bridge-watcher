import _ = require("lodash");

import {IEntityParams, IEntityFieldParams} from "../base-entity";
import {BaseSwitchEntity} from "../base-switch-entity";

export class BaseActionEntity extends BaseSwitchEntity {

  static defaultName = "AC01";

  static params: IEntityParams = {
    tableName: "action",
    entityName: "action",
    icon: "cog",
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseSwitchEntity.params.fields, [
    ]),
  };

}
