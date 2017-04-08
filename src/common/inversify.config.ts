import {Container, interfaces} from "inversify";
import _ = require("lodash");

import {BaseNodeEntity} from "./entity/node/base-node-entity";
import {BaseWidgetNodeEntity} from "./entity/node/widget/base-widget-node-entity";
import {IfWidgetNodeEntity} from "./entity/node/widget/if-widget-node-entity";
import {LogWidgetNodeEntity} from "./entity/node/widget/log-widget-node-entity";
import {NotifyWidgetNodeEntity} from "./entity/node/widget/notify-widget-node-entity";
import {ReadWidgetNodeEntity} from "./entity/node/widget/read-widget-node-entity";
import {WriteWidgetNodeEntity} from "./entity/node/widget/write-widget-node-entity";
import {LogNotifierNodeEntity} from "./entity/node/notifier/log-notifier-node-entity";
import {PushbulletNotifierNodeEntity} from "./entity/node/notifier/pushbullet-notifier-node-entity";
import {BoardNodeEntity} from "./entity/node/board-node-entity";
import {BridgeNodeEntity} from "./entity/node/bridge-node-entity";
import {JobNodeEntity} from "./entity/node/job-node-entity";
import {ServerNodeEntity} from "./entity/node/server-node-entity";
import {BaseNotifierNodeEntity} from "./entity/node/notifier/base-notifier-node-entity";

export var container = new Container();

container.bind(BaseNodeEntity).toConstructor(IfWidgetNodeEntity).whenTargetNamed("ifWidget");
container.bind(BaseNodeEntity).toConstructor(LogWidgetNodeEntity).whenTargetNamed("logWidget");
container.bind(BaseNodeEntity).toConstructor(NotifyWidgetNodeEntity).whenTargetNamed("notifyWidget");
container.bind(BaseNodeEntity).toConstructor(ReadWidgetNodeEntity).whenTargetNamed("readWidget");
container.bind(BaseNodeEntity).toConstructor(WriteWidgetNodeEntity).whenTargetNamed("writeWidget");
container.bind(BaseNodeEntity).toConstructor(LogNotifierNodeEntity).whenTargetNamed("logNotifier");
container.bind(BaseNodeEntity).toConstructor(PushbulletNotifierNodeEntity).whenTargetNamed("pushbulletNotifier");
container.bind(BaseNodeEntity).toConstructor(BoardNodeEntity).whenTargetNamed("board");
container.bind(BaseNodeEntity).toConstructor(BridgeNodeEntity).whenTargetNamed("bridge");
container.bind(BaseNodeEntity).toConstructor(JobNodeEntity).whenTargetNamed("job");
container.bind(BaseNodeEntity).toConstructor(ServerNodeEntity).whenTargetNamed("server");

container.bind(BaseWidgetNodeEntity).toConstructor(IfWidgetNodeEntity).whenTargetNamed("if");
container.bind(BaseWidgetNodeEntity).toConstructor(LogWidgetNodeEntity).whenTargetNamed("log");
container.bind(BaseWidgetNodeEntity).toConstructor(NotifyWidgetNodeEntity).whenTargetNamed("notify");
container.bind(BaseWidgetNodeEntity).toConstructor(ReadWidgetNodeEntity).whenTargetNamed("read");
container.bind(BaseWidgetNodeEntity).toConstructor(WriteWidgetNodeEntity).whenTargetNamed("write");

container.bind(BaseNotifierNodeEntity).toConstructor(LogNotifierNodeEntity).whenTargetNamed("log");
container.bind(BaseNotifierNodeEntity).toConstructor(PushbulletNotifierNodeEntity).whenTargetNamed("pushbullet");

container.bind<interfaces.Factory<BaseNodeEntity>>("Factory<BaseNodeEntity>").toFactory<BaseNodeEntity>(context => {
  return (data: any) => {
    let fullType = data.subType ? _.camelCase(data.subType + "_" + data.type) : _.camelCase(data.type);
    let NodeEntityClass: typeof BaseNodeEntity = <any>context.container.getNamed(BaseNodeEntity, fullType);
    return new (<any>NodeEntityClass)(data);
  }
});
