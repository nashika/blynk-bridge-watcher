import {BaseEntity} from "./base-entity";

export class ServerEntity extends BaseEntity {

  static modelName = "server";

  static generateDefault():ServerEntity {
    let result = new ServerEntity();
    result.name = "SV01";
    return result;
  }

}
