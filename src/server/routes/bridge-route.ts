import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {BridgeEntity} from "../../common/entity/bridge-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class BridgeRoute extends BaseRoute<BridgeEntity> {

  static EntityClass = BridgeEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
