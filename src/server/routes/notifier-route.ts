import {BaseRoute} from "./base-route";
import {Express} from "express";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";

export class NotifierRoute extends BaseRoute<BaseNotifierEntity> {

  static EntityClass = BaseNotifierEntity;

  constructor(app: Express) {
    super(app, true);
  }

}
