import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";
import {BridgeEntity} from "./bridge-entity";

export class BoardEntity extends BaseEntity {

  static modelName = "board";

  static params: IEntityParams = {
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
      },
    ]),
  };

  token: string;
  addr: string;
  port: number;

  static generateDefault(): BoardEntity {
    let result = new BoardEntity();
    result.name = "BD01";
    return result;
  }

}
