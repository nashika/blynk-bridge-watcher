import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";
import {BaseActionEntity} from "./action/base-action-entity";

export class BridgeEntity extends BaseEntity {

  static modelName = "bridge";
  static defaultName = "BR01";

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
        default: 60000,
      },
      {
        name: "pingTimeout",
        type: "number",
        default: 10000,
      },
      {
        name: "pingLimit",
        type: "number",
        default: 3,
      },
    ]),
  };

  token: string;
  pingInterval: number;
  pingTimeout: number;
  pingLimit: number;

}
