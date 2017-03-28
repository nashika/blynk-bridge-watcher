import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BoardNodeEntity} from "./board-node-entity";
import {JobNodeEntity} from "./job-node-entity";
import {BaseNotifierNodeEntity} from "./notifier/base-notifier-node-entity";
import {BaseNodeEntity} from "./base-node-entity";

export class ServerNodeEntity extends BaseNodeEntity {

  static params: IEntityParams = {
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
