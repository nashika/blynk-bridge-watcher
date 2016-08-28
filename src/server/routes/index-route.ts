import {Request, Response} from "express";
import _ = require("lodash");

import {BaseRoute} from "./base-route";
import {Express} from "express";

export class IndexRoute extends BaseRoute {

  constructor(app: Express) {
    super(app);
    app.get("/", this.index);
  }

  index = (req: Request, res: Response) => {
    res.render("index", {});
  };

}
