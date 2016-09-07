import {SingletonRegistry} from "../../common/util/singleton-registry";
import {BaseServerService} from "./base-server-service";
import {TableService} from "./table-service";
import {SocketIoServerService} from "./socket-io-server-service";

export class ServerServiceRegistry extends SingletonRegistry<BaseServerService> {

  Classes: {[key: string]: typeof BaseServerService} = {
    table: TableService,
    socketIo: SocketIoServerService,
  };

  get table(): TableService {
    return <TableService>this.getInstance("table");
  }

  get socketIo(): SocketIoServerService {
    return <SocketIoServerService>this.getInstance("socketIo");
  }

}

export var serverServiceRegistry = new ServerServiceRegistry();
