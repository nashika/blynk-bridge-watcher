import {Kernel} from "inversify";

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

export var svKernel = new Kernel();

svKernel.bind<NodeService>(NodeService).toSelf().inSingletonScope();
svKernel.bind<SocketIoServerService>(SocketIoServerService).toSelf().inSingletonScope();
svKernel.bind<TableService>(TableService).toSelf().inSingletonScope();

svKernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(ActionRoute).whenTargetNamed("action");
svKernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(BoardRoute).whenTargetNamed("board");
svKernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(BridgeRoute).whenTargetNamed("bridge");
svKernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(IndexRoute).whenTargetNamed("index");
svKernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(JobRoute).whenTargetNamed("job");
svKernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(NotifierRoute).whenTargetNamed("notifier");
svKernel.bind<BaseRoute<BaseEntity>>(BaseRoute).to(ServerRoute).whenTargetNamed("server");
