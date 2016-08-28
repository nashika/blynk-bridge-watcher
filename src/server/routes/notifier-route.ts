import {BaseRoute} from "./base-route";
import {Express} from "express";

export class NotifierRoute extends BaseRoute {

  static modelName = "notifier";

  constructor(app: Express) {
    super(app);
    app.get("/notifier", this.onIndex);
    app.post("/notifier/add", this.onAdd);
    app.post("/notifier/edit", this.onEdit);
    app.post("/notifier/delete", this.onDelete);
  }

}
