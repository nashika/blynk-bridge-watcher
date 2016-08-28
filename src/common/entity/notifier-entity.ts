import {BaseEntity, IEntityParams} from "./base-entity";

export class NotifierEntity extends BaseEntity {

  static modelName = "notifier";

  static params: IEntityParams = {
    children: {
    },
  };

  static generateDefault(): NotifierEntity {
    let result = new NotifierEntity();
    result.name = "NT01";
    return result;
  }

}
