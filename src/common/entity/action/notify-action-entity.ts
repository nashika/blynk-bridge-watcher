import {BaseActionEntity} from "./base-action-entity";

export class NotifyActionEntity extends BaseActionEntity {

  static generateDefault(): NotifyActionEntity {
    let result = new NotifyActionEntity();
    result.name = "ACNT01";
    result.type = "notify";
    return result;
  }

}
