import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BaseActionNodeEntity} from "./action/base-action-node-entity";
import {BaseNodeEntity} from "./base-node-entity";

export class BridgeNodeEntity extends BaseNodeEntity {

  static params: IEntityParams = {
    tableName: "bridge",
    entityName: "bridge",
    icon: "plug",
    children: {
      actions: BaseActionNodeEntity,
    },
    fields: _.merge({}, BaseNodeEntity.params.fields, {
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
