import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BridgeNodeEntity} from "./bridge-node-entity";
import {BaseNodeEntity} from "./base-node-entity";

export class BoardNodeEntity extends BaseNodeEntity {

  static params: IEntityParams = {
    tableName: "board",
    entityName: "board",
    icon: "sitemap",
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
