import {BaseActionEntity} from "./base-action-entity";

export class LogActionEntity extends BaseActionEntity {

  static generateDefault(): LogActionEntity {
    let result = new LogActionEntity();
    result.name = "ACLG01";
    result.type = "log";
    return result;
  }

}
