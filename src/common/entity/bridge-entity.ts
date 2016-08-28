import {BaseEntity, IEntityParams} from "./base-entity";
import {ActionEntity} from "./action-entity";

export class BridgeEntity extends BaseEntity {

  static modelName = "bridge";

  static params: IEntityParams = {
    children: {
      actions: ActionEntity,
    },
  };

  token: string;
  ping: {
    interval: number;
    timeout: number;
    limit: number;
  };

  static generateDefault(): BridgeEntity {
    let result = new BridgeEntity();
    result.name = "BR01";
    result.ping = {
      interval: null,
      timeout: null,
      limit: null,
    };
    return result;
  }

}
