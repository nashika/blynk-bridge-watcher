import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";
import {BaseActionEntity} from "./action/base-action-entity";

export class BridgeEntity extends BaseEntity {

  static modelName = "bridge";

  static params: IEntityParams = {
    children: {
      actions: BaseActionEntity,
    },
    fields: _.concat<IEntityFieldParams>(BaseEntity.params.fields, [
      {
        name: "token",
        type: "text",
        required: true,
      },
      {
        name: "pingInterval",
        type: "number",
      },
      {
        name: "pingTimeout",
        type: "number",
      },
      {
        name: "pingLimit",
        type: "number",
      },
    ]),
  };

  token: string;
  pingInterval: number;
  pingTimeout: number;
  pingLimit: number;

  static generateDefault(): BridgeEntity {
    let result = new BridgeEntity();
    result.name = "BR01";
    return result;
  }

}
