import {BaseRoute} from "./base-route";
import {Express} from "express";
import {JobEntity} from "../../common/entity/job-entity";

export class JobRoute extends BaseRoute<JobEntity> {

  static EntityClass = JobEntity;

  constructor(app: Express) {
    super(app, true);
  }

}
