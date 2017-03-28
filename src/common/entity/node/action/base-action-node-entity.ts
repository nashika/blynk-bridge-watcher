import _ = require("lodash");

import {BaseNodeEntity, INodeEntityParams} from "../base-node-entity";

export abstract class BaseActionNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "action",
    subType: "*",
    icon: "cog",
    children: {},
    fields: _.merge({}, BaseNodeEntity.params.fields, {}),
  };

}
