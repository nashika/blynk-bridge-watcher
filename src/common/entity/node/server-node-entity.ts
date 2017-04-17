import _ = require("lodash");

import {BoardNodeEntity} from "./board-node-entity";
import {JobNodeEntity} from "./job-node-entity";
import {BaseNotifierNodeEntity} from "./notifier/base-notifier-node-entity";
import {BaseNodeEntity, INodeEntityParams} from "./base-node-entity";

export class ServerNodeEntity extends BaseNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "server",
    icon: "globe",
    input: "none",
    output: "none",
    children: {
      boards: BoardNodeEntity,
      notifiers: BaseNotifierNodeEntity,
      jobs: JobNodeEntity,
    },
    fields: _.merge({}, BaseNodeEntity.params.fields, {}),
  };

}
