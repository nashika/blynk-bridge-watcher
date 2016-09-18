import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {JobEntity} from "../../common/entity/job-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class JobRoute extends BaseRoute<JobEntity> {

  static EntityClass = JobEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

}
