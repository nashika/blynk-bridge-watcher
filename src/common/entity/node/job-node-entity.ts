import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BaseNodeEntity} from "./base-node-entity";

export class JobNodeEntity extends BaseNodeEntity {

  static params: IEntityParams = {
    tableName: "job",
    entityName: "job",
    icon: "clock-o",
    children: {},
    fields: _.merge({}, BaseNodeEntity.params.fields, {
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
