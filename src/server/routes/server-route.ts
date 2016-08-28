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
  }

  index(req: Request, res: Response) {
    tableRegistry.server.findOne().then(entity => {
      res.json(entity);
    }).catch(err => this.responseErrorJson(res, err));
  }

}
