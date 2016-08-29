import {BaseActionEntity} from "./base-action-entity";

export class ReadActionEntity extends BaseActionEntity {

  static generateDefault(): ReadActionEntity {
    let result = new ReadActionEntity();
    result.name = "ACRD01";
    result.type = "read";
    return result;
  }

}
