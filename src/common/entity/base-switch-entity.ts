import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";

export class BaseSwitchEntity extends BaseEntity {

  static defaultName = "SW01";

  static params: IEntityParams = {
    tableName: "",
    entityName: "",
    icon: "times",
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
