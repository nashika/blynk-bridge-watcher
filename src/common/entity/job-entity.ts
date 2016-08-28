import {BaseEntity, IEntityParams} from "./base-entity";

export class JobEntity extends BaseEntity {

  static modelName = "job";

  static params: IEntityParams = {
    children: {},
  };

  static generateDefault(): JobEntity {
    let result = new JobEntity();
    result.name = "JB01";
    return result;
  }

}
