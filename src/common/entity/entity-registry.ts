import {ClassRegistry} from "../util/class-registry";
import {BaseEntity} from "./base-entity";
import {IfActionEntity} from "./action/if-action-entity";
import {LogActionEntity} from "./action/log-action-entity";
import {NotifyActionEntity} from "./action/notify-action-entity";
import {ReadActionEntity} from "./action/read-action-entity";
import {WriteActionEntity} from "./action/write-action-entity";
import {BoardEntity} from "./board-entity";
import {BridgeEntity} from "./bridge-entity";
import {JobEntity} from "./job-entity";
import {LogNotifierEntity} from "./notifier/log-notifier-entity";
import {ServerEntity} from "./server-entity";
import {PushbulletNotifierEntity} from "./notifier/pushbullet-notifier-entity";
import _ = require("lodash");

export class EntityRegistry extends ClassRegistry<BaseEntity> {

  Classes: {[key: string]: typeof BaseEntity} = {
    board: BoardEntity,
    bridge: BridgeEntity,
    job: JobEntity,
    server: ServerEntity,
    ifAction: IfActionEntity,
    logAction: LogActionEntity,
    notifyAction: NotifyActionEntity,
    readAction: ReadActionEntity,
    writeAction: WriteActionEntity,
    logNotifier: LogNotifierEntity,
    pushbulletNotifier: PushbulletNotifierEntity,
  };

  getClass(name: string): typeof BaseEntity {
    return <typeof BaseEntity>super.getClass(name);
  }

  generate(tableName:string, data: any): BaseEntity {
    let entityName:string;
    if (data.type) {
      entityName = _.camelCase(data.type + "_" + tableName);
    } else {
      entityName = _.camelCase(tableName);
    }
    let EntityClass = this.getClass(entityName);
    return new EntityClass(data);
  }

}

export var entityRegistry = new EntityRegistry();
