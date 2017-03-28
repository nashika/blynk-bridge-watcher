import {container} from "../common/inversify.config";

import {NodeClientService} from "./service/node-client-service";
import {SocketIoClientService} from "./service/socket-io-client-service";

container.bind<NodeClientService>(NodeClientService).toSelf().inSingletonScope();
container.bind<SocketIoClientService>(SocketIoClientService).toSelf().inSingletonScope();
