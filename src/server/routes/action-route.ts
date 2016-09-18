import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {BaseActionEntity} from "../../common/entity/action/base-action-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class ActionRoute extends BaseRoute<BaseActionEntity> {

  static EntityClass = BaseActionEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
