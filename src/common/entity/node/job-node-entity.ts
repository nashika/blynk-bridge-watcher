import _ = require("lodash");

import {BaseNodeEntity, INodeEntityParams, TNodeEntityNextNode} from "./base-node-entity";

export class JobNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "job",
    icon: "clock-o",
    input: "none",
    output: "none",
    children: {},
    fields: _.merge({}, BaseNodeEntity.params.fields, {
      cronTime: {
        type: "text",
        default: "0 0 0 * * *",
        required: true,
      },
      next: {
        type: "node",
        filter: "widget",
        required: true,
      },
    }),
  };

  cronTime: string;
  next: TNodeEntityNextNode[];

}
