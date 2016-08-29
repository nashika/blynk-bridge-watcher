import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "../base-entity";

export class BaseActionEntity extends BaseEntity {

  static modelName = "action";
  static defaultName = "AC01";

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

  type:string;

}
