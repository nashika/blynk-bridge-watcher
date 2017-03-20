import {Request, Response} from "express";
import {injectable} from "inversify";

import {BaseRoute} from "./base-route";
import {Express} from "express";
import {BaseEntity} from "../../common/entity/base-entity";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {TableService} from "../service/table-service";

@injectable()
export class IndexRoute extends BaseRoute<BaseEntity> {

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
