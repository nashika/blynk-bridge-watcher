import {container} from "../common/inversify.config";

import {NodeService} from "./service/node-service";
import {SocketIoServerService} from "./service/socket-io-server-service";
import {TableService} from "./service/table-service";

import {BaseEntity} from "../common/entity/base-entity";

import {BaseRoute} from "./routes/base-route";
import {ActionRoute} from "./routes/action-route";
import {BoardRoute} from "./routes/board-route";
import {BridgeRoute} from "./routes/bridge-route";
import {IndexRoute} from "./routes/index-route";
import {JobRoute} from "./routes/job-route";
import {NotifierRoute} from "./routes/notifier-route";
import {ServerRoute} from "./routes/server-route";

import {BaseNode} from "./node/base-node";
import {IfActionNode} from "./node/action/if-action-node";
import {LogActionNode} from "./node/action/log-action-node";
import {NotifyActionNode} from "./node/action/notify-action-node";
import {ReadActionNode} from "./node/action/read-action-node";
import {WriteActionNode} from "./node/action/write-action-node";
import {BridgeNode} from "./node/bridge/bridge-node";
import {LogNotifierNode} from "./node/notifier/log-notifier-node";
import {PushbulletNotifierNode} from "./node/notifier/pushbullet-notifier-node";
import {BoardNode} from "./node/board-node";
import {JobNode} from "./node/job-node";
import {ServerNode} from "./node/server-node";

container.bind<NodeService>(NodeService).toSelf().inSingletonScope();
container.bind<SocketIoServerService>(SocketIoServerService).toSelf().inSingletonScope();
container.bind<TableService>(TableService).toSelf().inSingletonScope();

container.bind<BaseRoute<BaseEntity>>(BaseRoute).to(ActionRoute).whenTargetNamed("action");
container.bind<BaseRoute<BaseEntity>>(BaseRoute).to(BoardRoute).whenTargetNamed("board");
container.bind<BaseRoute<BaseEntity>>(BaseRoute).to(BridgeRoute).whenTargetNamed("bridge");
container.bind<BaseRoute<BaseEntity>>(BaseRoute).to(IndexRoute).whenTargetNamed("index");
container.bind<BaseRoute<BaseEntity>>(BaseRoute).to(JobRoute).whenTargetNamed("job");
container.bind<BaseRoute<BaseEntity>>(BaseRoute).to(NotifierRoute).whenTargetNamed("notifier");
container.bind<BaseRoute<BaseEntity>>(BaseRoute).to(ServerRoute).whenTargetNamed("server");

container.bind<BaseNode<BaseEntity>>(BaseNode).to(IfActionNode).whenTargetNamed("ifAction");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(LogActionNode).whenTargetNamed("logAction");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(NotifyActionNode).whenTargetNamed("notifyAction");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(ReadActionNode).whenTargetNamed("readAction");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(WriteActionNode).whenTargetNamed("writeAction");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(BridgeNode).whenTargetNamed("bridge");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(LogNotifierNode).whenTargetNamed("logNotifier");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(PushbulletNotifierNode).whenTargetNamed("pushbulletNotifier");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(BoardNode).whenTargetNamed("board");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(JobNode).whenTargetNamed("job");
container.bind<BaseNode<BaseEntity>>(BaseNode).to(ServerNode).whenTargetNamed("server");
