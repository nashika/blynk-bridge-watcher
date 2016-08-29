import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";
import {BoardEntity} from "./board-entity";
import {NotifierEntity} from "./notifier-entity";
import {JobEntity} from "./job-entity";

export class ServerEntity extends BaseEntity {

  static modelName = "server";

  static params:IEntityParams = {
    children: {
      boards: BoardEntity,
      notifiers: NotifierEntity,
      jobs: JobEntity,
    },
    fields: _.concat<IEntityFieldParams>(BaseEntity.params.fields, [
    ]),
  };

  static generateDefault():ServerEntity {
    let result = new ServerEntity();
    result.name = "SV01";
    return result;
  }

}
