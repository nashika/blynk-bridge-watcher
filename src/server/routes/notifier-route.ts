import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {BaseNotifierNodeEntity} from "../../common/entity/node/notifier/base-notifier-node-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class NotifierRoute extends BaseRoute<BaseNotifierNodeEntity> {

  static EntityClass = BaseNotifierNodeEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
