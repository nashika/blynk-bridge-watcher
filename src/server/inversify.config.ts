import {container} from "../common/inversify.config";

import {BaseNodeEntity} from "../common/entity/node/base-node-entity";

import {BaseServerService} from "./service/base-server-service";
import {NodeServerService} from "./service/node-server-service";
import {SocketIoServerService} from "./service/socket-io-server-service";
import {TableServerService} from "./service/table-server-service";

import {BaseNode} from "./node/base-node";
import {IfWidgetNode} from "./node/widget/if-widget-node";
import {ReadWidgetNode} from "./node/widget/read-widget-node";
import {WriteWidgetNode} from "./node/widget/write-widget-node";
import {BridgeNode} from "./node/bridge/bridge-node";
import {LogNotifierNode} from "./node/notifier/log-notifier-node";
import {PushbulletNotifierNode} from "./node/notifier/pushbullet-notifier-node";
import {BoardNode} from "./node/board/board-node";
import {JobNode} from "./node/job-node";
import {ServerNode} from "./node/server-node";

container.bind<BaseNode<BaseNodeEntity>>(BaseNode).to(IfWidgetNode).whenTargetNamed("ifWidget");
container.bind<BaseNode<BaseNodeEntity>>(BaseNode).to(ReadWidgetNode).whenTargetNamed("readWidget");
container.bind<BaseNode<BaseNodeEntity>>(BaseNode).to(WriteWidgetNode).whenTargetNamed("writeWidget");
container.bind<BaseNode<BaseNodeEntity>>(BaseNode).to(BridgeNode).whenTargetNamed("bridge");
container.bind<BaseNode<BaseNodeEntity>>(BaseNode).to(LogNotifierNode).whenTargetNamed("logNotifier");
container.bind<BaseNode<BaseNodeEntity>>(BaseNode).to(PushbulletNotifierNode).whenTargetNamed("pushbulletNotifier");
container.bind<BaseNode<BaseNodeEntity>>(BaseNode).to(BoardNode).whenTargetNamed("board");
container.bind<BaseNode<BaseNodeEntity>>(BaseNode).to(JobNode).whenTargetNamed("job");
container.bind<BaseNode<BaseNodeEntity>>(BaseNode).to(ServerNode).whenTargetNamed("server");

container.bind<NodeServerService>(NodeServerService).toSelf().inSingletonScope();
container.bind<SocketIoServerService>(SocketIoServerService).toSelf().inSingletonScope();
container.bind<TableServerService>(TableServerService).toSelf().inSingletonScope();

container.bind<BaseServerService>("SocketIoService").toConstantValue(container.get(NodeServerService));
