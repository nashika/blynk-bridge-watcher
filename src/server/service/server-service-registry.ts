import {SingletonRegistry} from "../../common/util/singleton-registry";
import {BaseServerService} from "./base-server-service";
import {TableService} from "./table-service";

export class ServerServiceRegistry extends SingletonRegistry<BaseServerService> {

  Classes:{[key:string]:typeof BaseServerService} = {
    table: TableService,
  };

  get table():TableService { return <TableService>this.getInstance("table"); }

}

export var serverServiceRegistry = new ServerServiceRegistry();
