import {injectable} from "inversify";
import {getLogger} from "log4js";

import {BaseRoute} from "./base-route";
import {Express, Response, Request} from "express";
import {ServerNodeEntity} from "../../common/entity/node/server-node-entity";
import {ServerNode} from "../node/server-node";
import {TableService} from "../service/table-service";
import {SocketIoServerService} from "../service/socket-io-server-service";
import {NodeService} from "../service/node-service";

let logger = getLogger("system");

@injectable()
export class ServerRoute extends BaseRoute<ServerNodeEntity> {

  static EntityClass = ServerNodeEntity;

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

  index(_req: Request, res: Response) {
    this.tableService.findOne(ServerNodeEntity).then(entity => {
      res.json(entity);
    }).catch(err => this.responseErrorJson(res, err));
  }

  onStatus = (_req: Request, res: Response) => {
    res.json(!!this.serverNode);
  };

  onStart = (_req: Request, res: Response) => {
    this.start().then(() => {
      res.json(true);
    }).catch(err => this.responseErrorJson(res, err));
  };

  onStop = (_req: Request, res: Response) => {
    this.stop().then(() => {
      res.json(true);
    }).catch(err => this.responseErrorJson(res, err));
  };

  async start(): Promise<void> {
    logger.info("Server node initialize started.");
    try {
      this.serverNode = await this.nodeService.initialize();
    } catch (err) {
      logger.fatal(err);
      throw err;
    }
    logger.info("Server node initialize finished.");
  }

  stop(): Promise<void> {
    logger.info("Server node destruct started.");
    return this.serverNode.finalizeWrap().then(() => {
      delete this.serverNode;
      logger.info("Server node destruct finished.");
    });
  }

}
