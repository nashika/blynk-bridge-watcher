import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {BaseActionNodeEntity} from "../../common/entity/node/action/base-action-node-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class ActionRoute extends BaseRoute<BaseActionNodeEntity> {

  static EntityClass = BaseActionNodeEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
