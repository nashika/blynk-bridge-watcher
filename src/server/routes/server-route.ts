import {BaseRoute} from "./base-route";
import {Express, Response, Request} from "express";
import {tableRegistry} from "../table/table-registry";
import {ServerEntity} from "../../common/entity/server-entity";

export class ServerRoute extends BaseRoute<ServerEntity> {

  static EntityClass = ServerEntity;

  constructor(app: Express) {
    super(app, false);
    app.get("/server", this.onIndex);
    app.post("/server/edit", this.onEdit);
    app.post("/server/start", this.onStart);
    app.post("/server/stop", this.onStop);
  }

  index(req: Request, res: Response) {
    tableRegistry.server.findOne().then(entity => {
      res.json(entity);
    }).catch(err => this.responseErrorJson(res, err));
  }

  onStart = (req: Request, res: Response) => {
    setTimeout(() => {
      res.json(true);
    }, 3000);
  };

  onStop = (req: Request, res: Response) => {
    setTimeout(() => {
      res.json(true);
    }, 3000);
  };

}
