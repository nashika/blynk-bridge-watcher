import {injectable} from "inversify";
import {getLogger} from "log4js";

import {BaseRoute} from "./base-route";
import {Express, Response, Request} from "express";
import {ServerEntity} from "../../common/entity/server-entity";
import {ServerNode} from "../node/server-node";
import {TableService} from "../service/table-service";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {NodeService} from "../service/node-service";

let logger = getLogger("system");

@injectable()
export class ServerRoute extends BaseRoute<ServerEntity> {

  static EntityClass = ServerEntity;

  private serverNode: ServerNode;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService);
  }

  initialize(app: Express): void {
    super.initialize(app, false);
    app.get("/server", this.onIndex);
    app.post("/server/edit", this.onEdit);
    app.get("/server/status", this.onStatus);
    app.get("/server/start", this.onStart);
    app.get("/server/stop", this.onStop);
    this.start();
  }

  index(req: Request, res: Response) {
    this.tableService.findOne(ServerEntity).then(entity => {
      res.json(entity);
    }).catch(err => this.responseErrorJson(res, err));
  }

  onStatus = (req: Request, res: Response) => {
    res.json(!!this.serverNode);
  };

  onStart = (req: Request, res: Response) => {
    this.start().then(() => {
      res.json(true);
    }).catch(err => this.responseErrorJson(res, err));
  };

  onStop = (req: Request, res: Response) => {
    this.stop().then(() => {
      res.json(true);
    }).catch(err => this.responseErrorJson(res, err));
  };

  start(): Promise<void> {
    logger.info("Server node initialize started.");
    return this.nodeService.start().then(serverNode => {
      this.serverNode = serverNode;
      logger.info("Server node initialize finished.");
      return;
    }).catch(err => {
      logger.fatal(err);
      return Promise.reject(err);
    });
  }

  stop(): Promise<void> {
    logger.info("Server node destruct started.");
    return this.serverNode.finalize().then(() => {
      delete this.serverNode;
      logger.info("Server node destruct finished.");
    });
  }

}
