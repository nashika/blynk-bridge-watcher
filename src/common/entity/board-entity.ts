import {BaseEntity} from "./base-entity";

export class BoardEntity extends BaseEntity {

  static modelName = "board";

  token: string;
  addr: string;
  port: number;

  static generateDefault(): BoardEntity {
    let result = new BoardEntity();
    result.name = "BD01";
    return result;
  }

}
