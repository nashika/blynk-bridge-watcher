import {BaseRoute} from "./base-route";
import {Express} from "express";
import {BoardEntity} from "../../common/entity/board-entity";

export class BoardRoute extends BaseRoute<BoardEntity> {

  static EntityClass = BoardEntity;

  constructor(app: Express) {
    super(app, true);
  }

}
