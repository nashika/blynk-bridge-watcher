import {Container, interfaces} from "inversify";
import _ = require("lodash");

import {BaseEntity} from "./entity/base-entity";
import {BaseActionEntity} from "./entity/action/base-action-entity";
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
import {BaseNotifierEntity} from "./entity/notifier/base-notifier-entity";

export var container = new Container();

container.bind(BaseEntity).toConstructor(IfActionEntity).whenTargetNamed("ifAction");
container.bind(BaseEntity).toConstructor(LogActionEntity).whenTargetNamed("logAction");
container.bind(BaseEntity).toConstructor(NotifyActionEntity).whenTargetNamed("notifyAction");
container.bind(BaseEntity).toConstructor(ReadActionEntity).whenTargetNamed("readAction");
container.bind(BaseEntity).toConstructor(WriteActionEntity).whenTargetNamed("writeAction");
container.bind(BaseEntity).toConstructor(LogNotifierEntity).whenTargetNamed("logNotifier");
container.bind(BaseEntity).toConstructor(PushbulletNotifierEntity).whenTargetNamed("pushbulletNotifier");
container.bind(BaseEntity).toConstructor(BoardEntity).whenTargetNamed("board");
container.bind(BaseEntity).toConstructor(BridgeEntity).whenTargetNamed("bridge");
container.bind(BaseEntity).toConstructor(JobEntity).whenTargetNamed("job");
container.bind(BaseEntity).toConstructor(ServerEntity).whenTargetNamed("server");

container.bind(BaseActionEntity).toConstructor(IfActionEntity).whenTargetNamed("if");
container.bind(BaseActionEntity).toConstructor(LogActionEntity).whenTargetNamed("log");
container.bind(BaseActionEntity).toConstructor(NotifyActionEntity).whenTargetNamed("notify");
container.bind(BaseActionEntity).toConstructor(ReadActionEntity).whenTargetNamed("read");
container.bind(BaseActionEntity).toConstructor(WriteActionEntity).whenTargetNamed("write");

container.bind(BaseNotifierEntity).toConstructor(LogNotifierEntity).whenTargetNamed("log");
container.bind(BaseNotifierEntity).toConstructor(PushbulletNotifierEntity).whenTargetNamed("pushbullet");

container.bind<interfaces.Factory<BaseEntity>>("Factory<Entity>").toFactory<BaseEntity>(context => {
  return (tableName: string, data: any) => {
    let entityName: string;
    if (data.type) {
      entityName = _.camelCase(data.type + "_" + tableName);
    } else {
      entityName = _.camelCase(tableName);
    }
    let EntityClass: typeof BaseEntity = <any>context.container.getNamed(BaseEntity, entityName);
    return new (<any>EntityClass)(data);
  }
});
