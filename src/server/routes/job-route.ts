import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {JobNodeEntity} from "../../common/entity/node/job-node-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class JobRoute extends BaseRoute<JobNodeEntity> {

  static EntityClass = JobNodeEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
