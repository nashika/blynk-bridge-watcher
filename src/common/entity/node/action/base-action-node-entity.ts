import _ = require("lodash");

import {BaseNodeEntity, INodeEntityParams} from "../base-node-entity";

export abstract class BaseActionNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    tableName: "action",
    entityName: "action",
    icon: "cog",
    children: {},
    fields: _.merge({}, BaseNodeEntity.params.fields, {}),
  };

}
