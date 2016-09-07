import {BaseRoute} from "./base-route";
import {Express} from "express";
import {BridgeEntity} from "../../common/entity/bridge-entity";

export class BridgeRoute extends BaseRoute<BridgeEntity> {

  static EntityClass = BridgeEntity;

  constructor(app: Express) {
    super(app, true);
  }

}
