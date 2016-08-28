import {BaseEntity} from "./base-entity";

export class BoardEntity extends BaseEntity {

  static modelName = "board";

  static generateDefault():BoardEntity {
    let result = new BoardEntity();
    result.name = "BD01";
    return result;
  }

}
