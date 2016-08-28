import {BaseEntity, IEntityParams} from "./base-entity";
import {BridgeEntity} from "./bridge-entity";

export class BoardEntity extends BaseEntity {

  static modelName = "board";

  static params: IEntityParams = {
    children: {
      bridges: BridgeEntity,
    },
  };

  token: string;
  addr: string;
  port: number;

  static generateDefault(): BoardEntity {
    let result = new BoardEntity();
    result.name = "BD01";
    return result;
  }

}
