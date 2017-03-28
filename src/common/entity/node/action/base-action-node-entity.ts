import _ = require("lodash");

import {IEntityParams} from "../../base-entity";
import {BaseNodeEntity} from "../base-node-entity";

export abstract class BaseActionNodeEntity extends BaseNodeEntity {

  static params: IEntityParams = {
    tableName: "action",
    entityName: "action",
    icon: "cog",
    children: {},
    fields: _.merge({}, BaseNodeEntity.params.fields, {}),
  };

}
