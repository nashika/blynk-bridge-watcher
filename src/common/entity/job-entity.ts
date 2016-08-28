import {BaseEntity} from "./base-entity";

export class JobEntity extends BaseEntity {

  static modelName = "job";

  static generateDefault():JobEntity {
    let result = new JobEntity();
    result.name = "JB01";
    return result;
  }

}
