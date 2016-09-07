import {Request, Response} from "express";
import _ = require("lodash");

import {BaseRoute} from "./base-route";
import {Express} from "express";
import {BaseEntity} from "../../common/entity/base-entity";

export class IndexRoute extends BaseRoute<BaseEntity> {

  constructor(app: Express) {
    super(app, false);
    app.get("/", this.onIndex);
  }

  onIndex = (req: Request, res: Response) => {
    res.render("index", {});
  };

}
