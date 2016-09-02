import {SingletonRegistry} from "../../common/util/singleton-registry";
import {BaseService} from "./base-service";
import {EntityService} from "./entity-service";
import {ServerService} from "./server-service";
import {SocketIoService} from "./socket-io-service";

export class ServiceRegistry extends SingletonRegistry<BaseService> {

  Classes:{[key:string]:typeof BaseService} = {
    entity: EntityService,
    server: ServerService,
    socketIo: SocketIoService,
  };

  get entity():EntityService { return <EntityService>this.getInstance("entity"); }
  get server():ServerService { return <ServerService>this.getInstance("server"); }
  get socketIo():SocketIoService { return <SocketIoService>this.getInstance("socketIo"); }

}

export var serviceRegistry = new ServiceRegistry();
