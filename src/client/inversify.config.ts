import {container} from "../common/inversify.config";

import {NodeClientService} from "./service/node-client-service";
import {SocketIoClientService} from "./service/socket-io-client-service";
import {BaseClientService} from "./service/base-client-service";

container.bind<NodeClientService>(NodeClientService).toSelf().inSingletonScope();
container.bind<SocketIoClientService>(SocketIoClientService).toSelf().inSingletonScope();

container.bind<BaseClientService>("SocketIoService").toConstantValue(container.get(NodeClientService));
