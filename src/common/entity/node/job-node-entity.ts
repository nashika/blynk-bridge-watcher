import _ = require("lodash");

import {BaseNodeEntity, INodeEntityParams, INodeEntityNextNode} from "./base-node-entity";

export class JobNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "job",
    icon: "clock-o",
    input: "none",
    output: "null",
    children: {},
    fields: _.merge({}, BaseNodeEntity.params.fields, {
      cronTime: {
        type: "text",
        default: "0 0 0 * * *",
        required: true,
      },
      next: {
        type: "node",
      },
    }),
  };

  cronTime: string;
  next: INodeEntityNextNode[];

}
