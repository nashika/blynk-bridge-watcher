import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {BoardNodeEntity} from "../../common/entity/node/board-node-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class BoardRoute extends BaseRoute<BoardNodeEntity> {

  static EntityClass = BoardNodeEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
