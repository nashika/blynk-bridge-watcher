import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";

export class NotifierEntity extends BaseEntity {

  static defaultName = "NT01";

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "notifier",
    icon: "bell",
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

}
