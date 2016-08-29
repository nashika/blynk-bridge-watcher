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
        name: "ping.interval",
        type: "number",
      },
      {
        name: "ping.timeout",
        type: "number",
      },
      {
        name: "ping.limit",
        type: "number",
      },
    ]),
  };

  token: string;
  ping: {
    interval: number;
    timeout: number;
    limit: number;
  };

  static generateDefault(): BridgeEntity {
    let result = new BridgeEntity();
    result.name = "BR01";
    result.ping = {
      interval: null,
      timeout: null,
      limit: null,
    };
    return result;
  }

}
