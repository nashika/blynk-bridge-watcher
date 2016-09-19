import {Express, Request, Response} from "express";
import _ = require("lodash");
import log4js = require("log4js");
import {injectable, inject} from "inversify";

import {BaseEntity} from "../../common/entity/base-entity";
import {TableService} from "../service/table-service";
import {SocketIoServerService} from "../service/socket-io-server-service";

let logger = log4js.getLogger("system");

export class CodeError extends Error {
  code: number;
}

export class Code403Error extends CodeError {
  code: number = 403;
  message: string = "Access Forbidden";
}

export class Code404Error extends CodeError {
  code: number = 404;
  message: string = "Not Found";
}

export class Code500Error extends CodeError {
  code: number = 500;
  message: string = "Internal Server Error";
}

@injectable()
export abstract class BaseRoute<T extends BaseEntity> {

  static EntityClass: typeof BaseEntity;

  protected app: Express;
  @inject("Factory<BaseEntity>") protected entityFactory: (tableName: string, data: any) => BaseEntity;

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService) {
  }

  get Class(): typeof BaseRoute {
    return <typeof BaseRoute>this.constructor;
  }

  initialize(app: Express, applyDefaultRoute: boolean = true): void {
    this.app = app;
    if (applyDefaultRoute) {
      app.post(`/${this.Class.EntityClass.params.tableName}`, this.onIndex);
      app.post(`/${this.Class.EntityClass.params.tableName}/add`, this.onAdd);
      app.post(`/${this.Class.EntityClass.params.tableName}/edit`, this.onEdit);
      app.post(`/${this.Class.EntityClass.params.tableName}/remove`, this.onRemove);
    }
  }

  onIndex = (req: Request, res: Response) => {
    this.index(req, res);
  };

  onAdd = (req: Request, res: Response) => {
    this.add(req, res);
  };

  onEdit = (req: Request, res: Response) => {
    this.edit(req, res);
  };

  onRemove = (req: Request, res: Response) => {
    this.remove(req, res);
  };

  index(req: Request, res: Response) {
    this.tableService.find(this.Class.EntityClass, req.body).then(entities => {
      res.json(entities);
    }).catch(err => this.responseErrorJson(res, err));
  }

  add(req: Request, res: Response) {
    let entity = this.entityFactory(this.Class.EntityClass.params.tableName, req.body);
    this.tableService.insert(entity).then(newEntity => {
      this.socketIoServerService.status(newEntity._id, "stop");
      res.json(newEntity);
    }).catch(err => this.responseErrorJson(res, err));
  }

  edit(req: Request, res: Response) {
    let entity = this.entityFactory(this.Class.EntityClass.params.tableName, req.body);
    this.tableService.update(entity).then(updatedEntity => {
      res.json(updatedEntity);
    });
  }

  remove(req: Request, res: Response) {
    let entity = this.entityFactory(this.Class.EntityClass.params.tableName, req.body);
    this.tableService.remove(entity).then(() => {
      res.json(true);
    });
  }

  protected responseErrorHtml(res: Response, err: any) {
    let parse = this.parseError(err);
    res.status(parse.code).render("error", {error: {status: parse.code, message: parse.message, stack: parse.stack}});
  }

  protected responseErrorJson(res: Response, err: any) {
    let parse = this.parseError(err);
    let result = {
      result: false,
      message: parse.message,
      code: parse.code,
      error: err,
      stack: parse.stack && _.split(parse.stack, "\n"),
    };
    res.status(parse.code).json(result);
  }

  private parseError(err: any): {code: number, message: string, stack: string} {
    let code: number, message: string, stack: string;
    if (err instanceof CodeError) {
      let codeError = <CodeError>err;
      code = codeError.code;
      message = codeError.message;
      stack = codeError.stack;
    } else {
      code = 500;
      message = err.toString();
      stack = err && err.stack;
    }
    if (code == 500)
      logger.error(message);
    return {code: code, message: message, stack: stack};
  }

}
