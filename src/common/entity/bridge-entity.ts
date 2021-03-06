import _ = require("lodash");

import {BaseEntity, IEntityParams} from "./base-entity";
import {BaseActionEntity} from "./action/base-action-entity";

export class BridgeEntity extends BaseEntity {

  static params: IEntityParams = {
    tableName: "bridge",
    entityName: "bridge",
    icon: "plug",
    children: {
      actions: BaseActionEntity,
    },
    fields: _.merge({}, BaseEntity.params.fields, {
      token: {
        type: "text",
        required: true,
      },
      pingInterval: {
        type: "number",
        default: 60000,
      },
      pingLimit: {
        type: "number",
        default: 3,
      },
    }),
  };

  token: string;
  pingInterval: number;
  pingLimit: number;

}
