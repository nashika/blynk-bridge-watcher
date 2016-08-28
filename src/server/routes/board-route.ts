import {BaseRoute} from "./base-route";
import {Express} from "express";

export class BoardRoute extends BaseRoute {

  static modelName = "board";

  constructor(app: Express) {
    super(app);
    app.get("/board", this.onIndex);
    app.post("/board/add", this.onAdd);
    app.post("/board/edit", this.onEdit);
    app.post("/board/delete", this.onDelete);
  }

}
