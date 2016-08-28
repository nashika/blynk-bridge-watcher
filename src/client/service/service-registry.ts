import {ClassRegistry} from "../../common/util/class-registry";
import {BaseService} from "./base-service";
import {EntityService} from "./entity-service";

export class ServiceRegistry extends ClassRegistry<BaseService> {

  Classes:{[key:string]:typeof BaseService} = {
    entity: EntityService,
  };

  get entity():EntityService { return <EntityService>this.getInstance("entity"); }

}

export var serviceRegistry = new ServiceRegistry();
