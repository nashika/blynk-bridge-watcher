import {BaseTable} from "./base-table";
import {JobEntity} from "../../common/entity/job-entity";

export class JobTable extends BaseTable<JobEntity> {

  static EntityClass = JobEntity;

}
