import {BaseRoute} from "./base-route";
import {Express} from "express";

export class BridgeRoute extends BaseRoute {

  static modelName = "bridge";

  constructor(app: Express) {
    super(app);
    app.get("/bridge", this.onIndex);
    app.post("/bridge/add", this.onAdd);
    app.post("/bridge/edit", this.onEdit);
    app.post("/bridge/delete", this.onDelete);
  }

}
