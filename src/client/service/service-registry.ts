import {SingletonRegistry} from "../../common/util/singleton-registry";
import {BaseService} from "./base-service";
import {EntityService} from "./entity-service";
import {ServerService} from "./server-service";

export class ServiceRegistry extends SingletonRegistry<BaseService> {

  Classes:{[key:string]:typeof BaseService} = {
    entity: EntityService,
    server: ServerService,
  };

  get entity():EntityService { return <EntityService>this.getInstance("entity"); }
  get server():ServerService { return <ServerService>this.getInstance("server"); }

}

export var serviceRegistry = new ServiceRegistry();
