import {BaseRoute} from "./base-route";
import {Express} from "express";
import {BaseActionEntity} from "../../common/entity/action/base-action-entity";

export class ActionRoute extends BaseRoute<BaseActionEntity> {

  static EntityClass = BaseActionEntity;

  constructor(app: Express) {
    super(app, true);
  }

}
