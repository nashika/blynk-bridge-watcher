import {BaseEntity, IEntityParams} from "./base-entity";
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
  };

  static generateDefault():ServerEntity {
    let result = new ServerEntity();
    result.name = "SV01";
    return result;
  }

}
