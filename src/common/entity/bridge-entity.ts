import {BaseEntity} from "./base-entity";

export class BridgeEntity extends BaseEntity {

  static modelName = "bridge";

  token: string;

  static generateDefault(): BridgeEntity {
    let result = new BridgeEntity();
    result.name = "BR01";
    return result;
  }

}
