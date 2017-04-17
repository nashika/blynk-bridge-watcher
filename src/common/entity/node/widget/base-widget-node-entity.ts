import _ = require("lodash");

import {BaseNodeEntity, INodeEntityParams} from "../base-node-entity";

export abstract class BaseWidgetNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "widget",
    subType: "*",
    icon: "cog",
    input: "none",
    output: "none",
    children: {},
    fields: _.merge({}, BaseNodeEntity.params.fields, {}),
  };

}
