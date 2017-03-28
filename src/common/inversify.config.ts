import {Container, interfaces} from "inversify";
import _ = require("lodash");

import {BaseEntity} from "./entity/base-entity";
import {BaseActionNodeEntity} from "./entity/node/action/base-action-node-entity";
import {IfActionNodeEntity} from "./entity/node/action/if-action-node-entity";
import {LogActionNodeEntity} from "./entity/node/action/log-action-node-entity";
import {NotifyActionNodeEntity} from "./entity/node/action/notify-action-node-entity";
import {ReadActionNodeEntity} from "./entity/node/action/read-action-node-entity";
import {WriteActionNodeEntity} from "./entity/node/action/write-action-node-entity";
import {LogNotifierNodeEntity} from "./entity/node/notifier/log-notifier-node-entity";
import {PushbulletNotifierNodeEntity} from "./entity/node/notifier/pushbullet-notifier-node-entity";
import {BoardNodeEntity} from "./entity/node/board-node-entity";
import {BridgeNodeEntity} from "./entity/node/bridge-node-entity";
import {JobNodeEntity} from "./entity/node/job-node-entity";
import {ServerNodeEntity} from "./entity/node/server-node-entity";
import {BaseNotifierNodeEntity} from "./entity/node/notifier/base-notifier-node-entity";

export var container = new Container();

container.bind(BaseEntity).toConstructor(IfActionNodeEntity).whenTargetNamed("ifAction");
container.bind(BaseEntity).toConstructor(LogActionNodeEntity).whenTargetNamed("logAction");
container.bind(BaseEntity).toConstructor(NotifyActionNodeEntity).whenTargetNamed("notifyAction");
container.bind(BaseEntity).toConstructor(ReadActionNodeEntity).whenTargetNamed("readAction");
container.bind(BaseEntity).toConstructor(WriteActionNodeEntity).whenTargetNamed("writeAction");
container.bind(BaseEntity).toConstructor(LogNotifierNodeEntity).whenTargetNamed("logNotifier");
container.bind(BaseEntity).toConstructor(PushbulletNotifierNodeEntity).whenTargetNamed("pushbulletNotifier");
container.bind(BaseEntity).toConstructor(BoardNodeEntity).whenTargetNamed("board");
container.bind(BaseEntity).toConstructor(BridgeNodeEntity).whenTargetNamed("bridge");
container.bind(BaseEntity).toConstructor(JobNodeEntity).whenTargetNamed("job");
container.bind(BaseEntity).toConstructor(ServerNodeEntity).whenTargetNamed("server");

container.bind(BaseActionNodeEntity).toConstructor(IfActionNodeEntity).whenTargetNamed("if");
container.bind(BaseActionNodeEntity).toConstructor(LogActionNodeEntity).whenTargetNamed("log");
container.bind(BaseActionNodeEntity).toConstructor(NotifyActionNodeEntity).whenTargetNamed("notify");
container.bind(BaseActionNodeEntity).toConstructor(ReadActionNodeEntity).whenTargetNamed("read");
container.bind(BaseActionNodeEntity).toConstructor(WriteActionNodeEntity).whenTargetNamed("write");

container.bind(BaseNotifierNodeEntity).toConstructor(LogNotifierNodeEntity).whenTargetNamed("log");
container.bind(BaseNotifierNodeEntity).toConstructor(PushbulletNotifierNodeEntity).whenTargetNamed("pushbullet");

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
