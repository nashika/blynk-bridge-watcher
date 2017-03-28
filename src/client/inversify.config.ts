import {container} from "../common/inversify.config";

import {NodeEntityService} from "./service/node-entity-service";
import {SocketIoClientService} from "./service/socket-io-client-service";

container.bind<NodeEntityService>(NodeEntityService).toSelf().inSingletonScope();
container.bind<SocketIoClientService>(SocketIoClientService).toSelf().inSingletonScope();
