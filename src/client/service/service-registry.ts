import {ClassRegistry} from "../../common/util/class-registry";
import {BaseService} from "./base-service";
import {EntityService} from "./entity-service";
import {ServerService} from "./server-service";

export class ServiceRegistry extends ClassRegistry<BaseService> {

  Classes:{[key:string]:typeof BaseService} = {
    entity: EntityService,
    server: ServerService,
  };

  get entity():EntityService { return <EntityService>this.getInstance("entity"); }
  get server():ServerService { return <ServerService>this.getInstance("server"); }

}

export var serviceRegistry = new ServiceRegistry();
