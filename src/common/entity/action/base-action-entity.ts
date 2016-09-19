import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BaseTypedEntity} from "../base-typed-entity";

export abstract class BaseActionEntity extends BaseTypedEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "action",
    icon: "cog",
    children: {},
    fields: _.merge({}, BaseTypedEntity.params.fields, {}),
  };

}
