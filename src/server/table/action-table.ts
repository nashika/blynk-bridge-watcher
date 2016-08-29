import {BaseTable} from "./base-table";
import {BaseActionEntity} from "../../common/entity/action/base-action-entity";

export class ActionTable extends BaseTable<BaseActionEntity> {

  static EntityClass = BaseActionEntity;

}
