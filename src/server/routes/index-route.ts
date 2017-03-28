import {Request, Response} from "express";
import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {Express} from "express";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";
import {BaseNodeEntity} from "../../common/entity/node/base-node-entity";

@injectable()
export class IndexRoute extends BaseRoute<BaseNodeEntity> {

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
    super(tableService, socketIoServerService);
  }

  initialize(app: Express): void {
    super.initialize(app, false);
    app.get("/", this.onIndex);
  }

  onIndex = (_req: Request, res: Response) => {
    res.render("index", {});
  };

}
