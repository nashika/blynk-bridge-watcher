import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BaseTypedEntity} from "../base-typed-entity";

export class BaseActionEntity extends BaseTypedEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "action",
    icon: "cog",
    children: {},
    fields: _.merge({}, BaseTypedEntity.params.fields, {}),
  };

}
