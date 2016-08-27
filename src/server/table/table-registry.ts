import {ClassRegistry} from "../../common/util/class-registry";
import {BaseTable} from "./base-table";
import {ServerTable} from "./server-table";
import {BoardTable} from "./board-table";
import {BaseEntity} from "../../common/entity/base-entity";

export class TableRegistry extends ClassRegistry<BaseTable<BaseEntity>> {

  Classes:{[key:string]:typeof BaseTable} = {
    server: ServerTable,
    board: BoardTable,
  };

  public get server():ServerTable { return <ServerTable>this.getInstance("server"); }
  public get board():BoardTable { return <BoardTable>this.getInstance("board"); }

}

export var tableRegistry = new TableRegistry();
