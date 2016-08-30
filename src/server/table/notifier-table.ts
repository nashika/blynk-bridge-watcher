import {BaseTable} from "./base-table";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";

export class NotifierTable extends BaseTable<BaseNotifierEntity> {

  static EntityClass = BaseNotifierEntity;

}
