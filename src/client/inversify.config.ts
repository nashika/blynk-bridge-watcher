import {interfaces} from "inversify";

import {container} from "../common/inversify.config";

import {EntityService} from "./service/entity-service";
import {ServerService} from "./service/server-service";
import {SocketIoClientService} from "./service/socket-io-client-service";
import {AppComponent} from "./component/app-component";

container.bind<EntityService>(EntityService).toSelf().inSingletonScope();
container.bind<ServerService>(ServerService).toSelf().inSingletonScope();
container.bind<SocketIoClientService>(SocketIoClientService).toSelf().inSingletonScope();

container.bind<interfaces.Newable<AppComponent>>("Newable<Component>").toConstructor<AppComponent>(AppComponent).whenTargetNamed("app");
