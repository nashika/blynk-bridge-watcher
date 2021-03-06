import _ = require("lodash");

import {BaseEntity, IEntityParams} from "./base-entity";

export abstract class BaseTypedEntity extends BaseEntity {

  static params: IEntityParams = {
    tableName: "",
    entityName: "",
    icon: "times",
    children: {},
    fields: _.merge({}, BaseEntity.params.fields, {
      type: {
        type: "text",
        required: true,
        disabled: true,
      },
    }),
  };

  type:string;

}
