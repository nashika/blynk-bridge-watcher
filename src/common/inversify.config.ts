import {Kernel, interfaces} from "inversify";
import _ = require("lodash");

import {BaseEntity} from "./entity/base-entity";
import {IfActionEntity} from "./entity/action/if-action-entity";
import {LogActionEntity} from "./entity/action/log-action-entity";
import {NotifyActionEntity} from "./entity/action/notify-action-entity";
import {ReadActionEntity} from "./entity/action/read-action-entity";
import {WriteActionEntity} from "./entity/action/write-action-entity";
import {LogNotifierEntity} from "./entity/notifier/log-notifier-entity";
import {PushbulletNotifierEntity} from "./entity/notifier/pushbullet-notifier-entity";
import {BoardEntity} from "./entity/board-entity";
import {BridgeEntity} from "./entity/bridge-entity";
import {JobEntity} from "./entity/job-entity";
import {ServerEntity} from "./entity/server-entity";

export var kernel = new Kernel();

kernel.bind(BaseEntity).toConstructor(IfActionEntity).whenTargetNamed("ifAction");
kernel.bind(BaseEntity).toConstructor(LogActionEntity).whenTargetNamed("logAction");
kernel.bind(BaseEntity).toConstructor(NotifyActionEntity).whenTargetNamed("notifyAction");
kernel.bind(BaseEntity).toConstructor(ReadActionEntity).whenTargetNamed("readAction");
kernel.bind(BaseEntity).toConstructor(WriteActionEntity).whenTargetNamed("writeAction");
kernel.bind(BaseEntity).toConstructor(LogNotifierEntity).whenTargetNamed("logNotifier");
kernel.bind(BaseEntity).toConstructor(PushbulletNotifierEntity).whenTargetNamed("pushbulletNotifier");
kernel.bind(BaseEntity).toConstructor(BoardEntity).whenTargetNamed("board");
kernel.bind(BaseEntity).toConstructor(BridgeEntity).whenTargetNamed("bridge");
kernel.bind(BaseEntity).toConstructor(JobEntity).whenTargetNamed("job");
kernel.bind(BaseEntity).toConstructor(ServerEntity).whenTargetNamed("server");

kernel.bind<interfaces.Factory<BaseEntity>>("Factory<BaseEntity>").toFactory<BaseEntity>(context => {
  return (tableName: string, data: any) => {
    let entityName: string;
    if (data.type) {
      entityName = _.camelCase(data.type + "_" + tableName);
    } else {
      entityName = _.camelCase(tableName);
    }
    let EntityClass: typeof BaseEntity = <any>context.kernel.getNamed(BaseEntity, entityName);
    return new (<any>EntityClass)(data);
  }
});
