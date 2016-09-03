import _ = require("lodash");

import {BaseEntity, IEntityParams} from "./base-entity";
import {BoardEntity} from "./board-entity";
import {JobEntity} from "./job-entity";
import {BaseNotifierEntity} from "./notifier/base-notifier-entity";

export class ServerEntity extends BaseEntity {

  static params:IEntityParams = {
    tableName: "server",
    entityName: "server",
    icon: "globe",
    children: {
      boards: BoardEntity,
      notifiers: BaseNotifierEntity,
      jobs: JobEntity,
    },
    fields: _.merge({}, BaseEntity.params.fields, {
      name: {
        default: "SV01",
      },
    }),
  };

}
