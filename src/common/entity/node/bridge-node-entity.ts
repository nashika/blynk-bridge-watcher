import _ = require("lodash");

import {BaseWidgetNodeEntity} from "./widget/base-widget-node-entity";
import {BaseNodeEntity, INodeEntityParams} from "./base-node-entity";

export class BridgeNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "bridge",
    icon: "plug",
    children: {
      widgets: BaseWidgetNodeEntity,
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
