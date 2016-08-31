import {getLogger} from "log4js";

import {BaseRoute} from "./base-route";
import {Express, Response, Request} from "express";
import {tableRegistry} from "../table/table-registry";
import {ServerEntity} from "../../common/entity/server-entity";
import {ServerNode} from "../node/server-node";

let logger = getLogger("system");

export class ServerRoute extends BaseRoute<ServerEntity> {

  static EntityClass = ServerEntity;

  serverNode:ServerNode;

  constructor(app: Express) {
    super(app, false);
    app.get("/server", this.onIndex);
    app.post("/server/edit", this.onEdit);
    app.get("/server/status", this.onStatus);
    app.get("/server/start", this.onStart);
    app.get("/server/stop", this.onStop);
    this.start();
  }

  index(req: Request, res: Response) {
    tableRegistry.server.findOne().then(entity => {
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

  start():Promise<void> {
    logger.info("Server node initialize started.");
    return ServerNode.generate().then(serverNode => {
      this.serverNode = serverNode;
      logger.info("Server node initialize finished.");
      return;
    }).catch(err => {
      logger.fatal(err);
      return Promise.reject(err);
    });
  }

  stop():Promise<void> {
    logger.info("Server node destruct started.");
    delete this.serverNode;
    logger.info("Server node destruct finished.");
    return Promise.resolve();
  }

}
