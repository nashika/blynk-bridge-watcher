import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";

export class NotifierEntity extends BaseEntity {

  static modelName = "notifier";

  static params: IEntityParams = {
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

  static generateDefault(): NotifierEntity {
    let result = new NotifierEntity();
    result.name = "NT01";
    return result;
  }

}
