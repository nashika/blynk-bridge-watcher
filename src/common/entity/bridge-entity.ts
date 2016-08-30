import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";
import {BaseActionEntity} from "./action/base-action-entity";

export class BridgeEntity extends BaseEntity {

  static defaultName = "BR01";

  static params: IEntityParams = {
    tableName: "bridge",
    entityName: "bridge",
    icon: "plug",
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
        name: "pingLimit",
        type: "number",
        default: 3,
      },
    ]),
  };

  token: string;
  pingInterval: number;
  pingLimit: number;

}
