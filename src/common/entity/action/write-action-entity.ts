import {BaseActionEntity} from "./base-action-entity";

export class WriteActionEntity extends BaseActionEntity {

  static generateDefault(): WriteActionEntity {
    let result = new WriteActionEntity();
    result.name = "ACWR01";
    result.type = "write";
    return result;
  }

}
