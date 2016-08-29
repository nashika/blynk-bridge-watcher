import {BaseEntity, IEntityParams} from "../base-entity";

export class BaseActionEntity extends BaseEntity {

  static modelName = "action";

  static params: IEntityParams = {
    children: {},
  };

  type:string;

  static generateDefault(): BaseActionEntity {
    let result = new BaseActionEntity();
    result.name = "AC01";
    return result;
  }

}
