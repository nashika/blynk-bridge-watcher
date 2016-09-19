import {interfaces} from "inversify";

import {kernel} from "../common/inversify.config";

import {EntityService} from "./service/entity-service";
import {ServerService} from "./service/server-service";
import {SocketIoClientService} from "./service/socket-io-client-service";
import {AppComponent} from "./component/app-component";

kernel.bind<EntityService>(EntityService).toSelf().inSingletonScope();
kernel.bind<ServerService>(ServerService).toSelf().inSingletonScope();
kernel.bind<SocketIoClientService>(SocketIoClientService).toSelf().inSingletonScope();

kernel.bind<interfaces.Newable<AppComponent>>("Newable<Component>").toConstructor<AppComponent>(AppComponent).whenTargetNamed("app");
