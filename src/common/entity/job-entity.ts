import _ = require("lodash");

import {BaseEntity, IEntityParams} from "./base-entity";

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
      action: {
        type: "node",
        filter: "action",
        required: true,
      },
    }),
  };

  cronTime: string;
  board: string;
  bridge: string;
  action: string;

}
