import {BaseRoute} from "./base-route";
import {Express} from "express";
import {ActionEntity} from "../../common/entity/action-entity";

export class ActionRoute extends BaseRoute<ActionEntity> {

  static EntityClass = ActionEntity;

  constructor(app: Express) {
    super(app, true);
  }

}
