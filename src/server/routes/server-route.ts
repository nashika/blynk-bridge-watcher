import {BaseRoute} from "./base-route";
import {Express, Response, Request} from "express";
import {tableRegistry} from "../table/table-registry";

export class ServerRoute extends BaseRoute {

  static modelName = "server";

  constructor(app: Express) {
    super(app);
    app.get("/server", this.onIndex);
    app.post("/server/edit", this.onEdit);
  }

  index(req: Request, res: Response) {
    tableRegistry.server.findOne().then(entity => {
      res.json(entity);
    }).catch(err => this.responseErrorJson(res, err));
  }

}
