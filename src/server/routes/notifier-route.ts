import {BaseRoute} from "./base-route";
import {Express} from "express";
import {NotifierEntity} from "../../common/entity/notifier-entity";

export class NotifierRoute extends BaseRoute<NotifierEntity> {

  static EntityClass = NotifierEntity;

  constructor(app: Express) {
    super(app, true);
  }

}
