import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {BoardEntity} from "../../common/entity/board-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class BoardRoute extends BaseRoute<BoardEntity> {

  static EntityClass = BoardEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
