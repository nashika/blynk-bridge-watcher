import _ = require("lodash");

import {BaseEntity, IEntityParams} from "./base-entity";
import {BridgeEntity} from "./bridge-entity";

export class BoardEntity extends BaseEntity {

  static params: IEntityParams = {
    tableName: "board",
    entityName: "board",
    icon: "sitemap",
    children: {
      bridges: BridgeEntity,
    },
    fields: _.merge({}, BaseEntity.params.fields, {
      name: {
        default: "BD01",
      },
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
