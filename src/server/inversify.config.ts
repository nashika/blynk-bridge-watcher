import {kernel} from "../common/inversify.config";

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

kernel.bind<NodeService>(NodeService).toSelf().inSingletonScope();
kernel.bind<SocketIoServerService>(SocketIoServerService).toSelf().inSingletonScope();
kernel.bind<TableService>(TableService).toSelf().inSingletonScope();

kernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(ActionRoute).whenTargetNamed("action");
kernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(BoardRoute).whenTargetNamed("board");
kernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(BridgeRoute).whenTargetNamed("bridge");
kernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(IndexRoute).whenTargetNamed("index");
kernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(JobRoute).whenTargetNamed("job");
kernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(NotifierRoute).whenTargetNamed("notifier");
kernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(ServerRoute).whenTargetNamed("server");

kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(IfActionNode).whenTargetNamed("ifAction");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(LogActionNode).whenTargetNamed("logAction");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(NotifyActionNode).whenTargetNamed("notifyAction");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(ReadActionNode).whenTargetNamed("readAction");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(WriteActionNode).whenTargetNamed("writeAction");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(BridgeNode).whenTargetNamed("bridge");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(LogNotifierNode).whenTargetNamed("logNotifier");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(PushbulletNotifierNode).whenTargetNamed("pushbulletNotifier");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(BoardNode).whenTargetNamed("board");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(JobNode).whenTargetNamed("job");
kernel.bind<BaseNode<BaseEntity>>(BaseNode).to(ServerNode).whenTargetNamed("server");
