import _ = require("lodash");

import {BaseNodeEntity, INodeEntityParams} from "./base-node-entity";

export class JobNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
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
