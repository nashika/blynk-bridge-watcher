import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BaseTypedEntity} from "../base-typed-entity";

export class BaseNotifierEntity extends BaseTypedEntity {

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "notifier",
    icon: "bell",
    children: {},
    fields: _.merge({}, BaseTypedEntity.params.fields, {
      name: {
        default: "NT01",
      },
      firstDelay: {
        type: "number",
        default: 3000,
      },
      nextDelay: {
        type: "number",
        default: 10000,
      },
    }),
  };

  firstDelay: number;
  nextDelay: number;

}
