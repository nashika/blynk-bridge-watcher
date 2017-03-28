import {Container, interfaces} from "inversify";
import _ = require("lodash");

import {BaseNodeEntity} from "./entity/node/base-node-entity";
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

container.bind(BaseNodeEntity).toConstructor(IfActionNodeEntity).whenTargetNamed("ifAction");
container.bind(BaseNodeEntity).toConstructor(LogActionNodeEntity).whenTargetNamed("logAction");
container.bind(BaseNodeEntity).toConstructor(NotifyActionNodeEntity).whenTargetNamed("notifyAction");
container.bind(BaseNodeEntity).toConstructor(ReadActionNodeEntity).whenTargetNamed("readAction");
container.bind(BaseNodeEntity).toConstructor(WriteActionNodeEntity).whenTargetNamed("writeAction");
container.bind(BaseNodeEntity).toConstructor(LogNotifierNodeEntity).whenTargetNamed("logNotifier");
container.bind(BaseNodeEntity).toConstructor(PushbulletNotifierNodeEntity).whenTargetNamed("pushbulletNotifier");
container.bind(BaseNodeEntity).toConstructor(BoardNodeEntity).whenTargetNamed("board");
container.bind(BaseNodeEntity).toConstructor(BridgeNodeEntity).whenTargetNamed("bridge");
container.bind(BaseNodeEntity).toConstructor(JobNodeEntity).whenTargetNamed("job");
container.bind(BaseNodeEntity).toConstructor(ServerNodeEntity).whenTargetNamed("server");

container.bind(BaseActionNodeEntity).toConstructor(IfActionNodeEntity).whenTargetNamed("if");
container.bind(BaseActionNodeEntity).toConstructor(LogActionNodeEntity).whenTargetNamed("log");
container.bind(BaseActionNodeEntity).toConstructor(NotifyActionNodeEntity).whenTargetNamed("notify");
container.bind(BaseActionNodeEntity).toConstructor(ReadActionNodeEntity).whenTargetNamed("read");
container.bind(BaseActionNodeEntity).toConstructor(WriteActionNodeEntity).whenTargetNamed("write");

container.bind(BaseNotifierNodeEntity).toConstructor(LogNotifierNodeEntity).whenTargetNamed("log");
container.bind(BaseNotifierNodeEntity).toConstructor(PushbulletNotifierNodeEntity).whenTargetNamed("pushbullet");

container.bind<interfaces.Factory<BaseNodeEntity>>("Factory<BaseNodeEntity>").toFactory<BaseNodeEntity>(context => {
  return (data: any) => {
    let fullType = data.subType ? _.camelCase(data.type + "_" + data.subType) : _.camelCase(data.type);
    let NodeEntityClass: typeof BaseNodeEntity = <any>context.container.getNamed(BaseNodeEntity, fullType);
    return new (<any>NodeEntityClass)(data);
  }
});
