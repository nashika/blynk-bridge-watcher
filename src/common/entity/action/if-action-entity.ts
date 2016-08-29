import {BaseActionEntity} from "./base-action-entity";

export class IfActionEntity extends BaseActionEntity {

  operator:string;
  value:number;
  then:string;
  else:string;

  static generateDefault(): IfActionEntity {
    let result = new IfActionEntity();
    result.name = "ACIF01";
    result.type = "if";
    return result;
  }

}
