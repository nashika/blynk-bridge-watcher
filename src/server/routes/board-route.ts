import {BaseRoute} from "./base-route";
import {Express, Response, Request} from "express";
import {tableRegistry} from "../table/table-registry";
import {BoardEntity} from "../../common/entity/board-entity";

export class BoardRoute extends BaseRoute {

  constructor(app: Express) {
    super(app);
    app.get("/board", this.list);
    app.post("/board/add", this.add);
    app.post("/board/edit", this.edit);
    app.post("/board/delete", this.delete);
  }

  list = (req: Request, res: Response) => {
    tableRegistry.board.find().then(entities => {
      res.json(entities);
    }).catch(err => this.responseErrorJson(res, err));
  };

  add = (req: Request, res: Response) => {
    let entity = new BoardEntity(req.body);
    tableRegistry.board.insert(entity).then(newEntity => {
      res.json(newEntity);
    }).catch(err => this.responseErrorJson(res, err));
  };

  edit = (req: Request, res: Response) => {
    let entity = new BoardEntity(req.body);
    tableRegistry.board.update(entity).then(updatedEntity => {
      res.json(updatedEntity);
    });
  };

  delete = (req: Request, res:Response) => {
    let entity = new BoardEntity(req.body);
    tableRegistry.board.delete(entity).then(() => {
      res.json(true);
    });
  };

}
