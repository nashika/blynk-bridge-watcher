import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class NotifierRoute extends BaseRoute<BaseNotifierEntity> {

  static EntityClass = BaseNotifierEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
