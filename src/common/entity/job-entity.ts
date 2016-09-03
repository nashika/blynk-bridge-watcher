import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";

export class JobEntity extends BaseEntity {

  static params: IEntityParams = {
    tableName: "job",
    entityName: "job",
    icon: "clock-o",
    children: {},
    fields: _.merge({}, BaseEntity.params.fields, {
      name: {
        default: "JB01",
      },
      cronTime: {
        type: "text",
        default: "0 0 0 * * *",
        required: true,
      },
      board: {
        type: "text",
        required: true,
      },
      bridge: {
        type: "text",
        required: true,
      },
      action: {
        type: "text",
        required: true,
      },
    }),
  };

  cronTime: string;
  board: string;
  bridge: string;
  action: string;

}
