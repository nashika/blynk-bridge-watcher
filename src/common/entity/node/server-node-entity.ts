import _ = require("lodash");

import {BoardNodeEntity} from "./board-node-entity";
import {JobNodeEntity} from "./job-node-entity";
import {BaseNotifierNodeEntity} from "./notifier/base-notifier-node-entity";
import {BaseNodeEntity, INodeEntityParams} from "./base-node-entity";

export class ServerNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    tableName: "server",
    entityName: "server",
    icon: "globe",
    children: {
      boards: BoardNodeEntity,
      notifiers: BaseNotifierNodeEntity,
      jobs: JobNodeEntity,
    },
    fields: _.merge({}, BaseNodeEntity.params.fields, {}),
  };

}
