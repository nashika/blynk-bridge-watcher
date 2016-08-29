import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "../base-entity";

export class BaseActionEntity extends BaseEntity {

  static defaultName = "AC01";

  static params: IEntityParams = {
    tableName: "action",
    entityName: "action",
    icon: "cog",
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseEntity.params.fields, [
      {
        name: "type",
        type: "text",
        required: true,
        disabled: true,
      },
    ]),
  };

  type:string;

}
