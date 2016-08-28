import {BaseRoute} from "./base-route";
import {Express} from "express";

export class JobRoute extends BaseRoute {

  static modelName = "job";

  constructor(app: Express) {
    super(app);
    app.get("/job", this.onIndex);
    app.post("/job/add", this.onAdd);
    app.post("/job/edit", this.onEdit);
    app.post("/job/delete", this.onDelete);
  }

}
