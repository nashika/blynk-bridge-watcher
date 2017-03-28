import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {BridgeNodeEntity} from "../../common/entity/node/bridge-node-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class BridgeRoute extends BaseRoute<BridgeNodeEntity> {

  static EntityClass = BridgeNodeEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
