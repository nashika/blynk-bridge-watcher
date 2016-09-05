import _ = require("lodash");

import {BaseEntity, IEntityParams} from "./base-entity";

export class BaseTypedEntity extends BaseEntity {

  static params: IEntityParams = {
    tableName: "",
    entityName: "",
    icon: "times",
    children: {},
    fields: _.merge({}, BaseEntity.params.fields, {
      name: {
        default: "SW01",
      },
      type: {
        type: "text",
        required: true,
        disabled: true,
      },
    }),
  };

  type:string;

}
