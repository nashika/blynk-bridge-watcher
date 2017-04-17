import _ = require("lodash");

import {BridgeNodeEntity} from "./bridge-node-entity";
import {BaseNodeEntity, INodeEntityParams} from "./base-node-entity";

export class BoardNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "board",
    icon: "sitemap",
    input: "none",
    output: "none",
    children: {
      bridges: BridgeNodeEntity,
    },
    fields: _.merge({}, BaseNodeEntity.params.fields, {
      token: {
        type: "text",
        required: true,
      },
      addr: {
        type: "text",
      },
      port: {
        type: "number",
        default: 8442,
      },
    }),
  };

  token: string;
  addr: string;
  port: number;

}
