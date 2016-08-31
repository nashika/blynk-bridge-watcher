import {SingletonRegistry} from "../../common/util/singleton-registry";
import {BaseTable} from "./base-table";
import {BaseEntity} from "../../common/entity/base-entity";
import {ActionTable} from "./action-table";
import {BoardTable} from "./board-table";
import {BridgeTable} from "./bridge-table";
import {JobTable} from "./job-table";
import {NotifierTable} from "./notifier-table";
import {ServerTable} from "./server-table";

export class TableRegistry extends SingletonRegistry<BaseTable<BaseEntity>> {

  Classes:{[key:string]:typeof BaseTable} = {
    action: ActionTable,
    board: BoardTable,
    bridge: BridgeTable,
    job: JobTable,
    notifier: NotifierTable,
    server: ServerTable,
  };

  get action():ActionTable { return <ActionTable>this.getInstance("action"); }
  get board():BoardTable { return <BoardTable>this.getInstance("board"); }
  get bridge():BridgeTable { return <BridgeTable>this.getInstance("bridge"); }
  get job():JobTable { return <JobTable>this.getInstance("job"); }
  get notifier():NotifierTable { return <NotifierTable>this.getInstance("notifier"); }
  get server():ServerTable { return <ServerTable>this.getInstance("server"); }

}

export var tableRegistry = new TableRegistry();
