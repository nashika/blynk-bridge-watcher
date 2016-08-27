import {ClassRegistry} from "../../common/util/class-registry";
import {BaseEntity} from "../../common/entity/base-entity";
import {ActionEntity} from "./action-entity";
import {BoardEntity} from "./board-entity";
import {BridgeEntity} from "./bridge-entity";
import {JobEntity} from "./job-entity";
import {NotifierEntity} from "./notifier-entity";
import {ServerEntity} from "./server-entity";

export class EntityRegistry extends ClassRegistry<BaseEntity> {

  Classes:{[key:string]:typeof BaseEntity} = {
    action: ActionEntity,
    board: BoardEntity,
    bridge: BridgeEntity,
    job: JobEntity,
    notifier: NotifierEntity,
    server: ServerEntity,
  };

  getClass(name:string):typeof BaseEntity {
    return <typeof BaseEntity>super.getClass(name);
  }

}

export var entityRegistry = new EntityRegistry();
