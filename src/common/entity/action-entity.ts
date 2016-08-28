import {BaseEntity, IEntityParams} from "./base-entity";

export class ActionEntity extends BaseEntity {

  static modelName = "action";

  static params: IEntityParams = {
    children: {},
  };

  static generateDefault(): ActionEntity {
    let result = new ActionEntity();
    result.name = "AC01";
    return result;
  }

}
