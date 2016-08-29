import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";
import {BridgeEntity} from "./bridge-entity";

export class BoardEntity extends BaseEntity {

  static modelName = "board";
  static defaultName = "BD01";

  static params: IEntityParams = {
    icon: "sitemap",
    children: {
      bridges: BridgeEntity,
    },
    fields: _.concat<IEntityFieldParams>(BaseEntity.params.fields, [
      {
        name: "token",
        type: "text",
        required: true,
      },
      {
        name: "addr",
        type: "text",
      },
      {
        name: "port",
        type: "number",
        default: 8442,
      },
    ]),
  };

  token: string;
  addr: string;
  port: number;

}
