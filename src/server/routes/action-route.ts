import {BaseRoute} from "./base-route";
import {Express} from "express";

export class ActionRoute extends BaseRoute {

  static modelName = "action";

  constructor(app: Express) {
    super(app);
    app.get("/action", this.onIndex);
    app.post("/action/add", this.onAdd);
    app.post("/action/edit", this.onEdit);
    app.post("/action/delete", this.onDelete);
  }

}
