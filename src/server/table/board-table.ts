import {BaseTable} from "./base-table";
import {BoardEntity} from "../../common/entity/board-entity";

export class BoardTable extends BaseTable<BoardEntity> {

  static EntityClass = BoardEntity;

}
