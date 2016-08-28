import {BaseTable} from "./base-table";
import {ActionEntity} from "../../common/entity/action-entity";

export class ActionTable extends BaseTable<ActionEntity> {

  static EntityClass = ActionEntity;

}
