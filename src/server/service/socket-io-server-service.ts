import socketIo = require("socket.io");
import {Server as HttpServer} from "http";
import _ = require("lodash");
import {inject, injectable} from "inversify";
import {getLogger} from "log4js";

import {
  ISocketIoLogData, ISocketIoStatusData, TSocketIoStatus, TSocketIoLogLevel,
  ISocketIoSendData, ISocketIoData, ISocketIoRequestLogsData, ISocketIoResponseLogsData, ISocketIoFindQuery
} from "../../common/util/socket-io-util";
import {BaseServerService} from "./base-server-service";
import {NodeService} from "./node-service";
import {container} from "../../common/inversify.config";
import {BaseNodeEntity} from "../../common/entity/node/base-node-entity";
import {TableService} from "./table-service";

let logger = getLogger("system");

@injectable()
export class SocketIoServerService extends BaseServerService {

  private io: SocketIO.Server;
  private logs: {[_id: string]: ISocketIoLogData[]};
  private statuses: {[_id: string]: ISocketIoStatusData};

  protected nodeService: NodeService;
  protected tableService: TableService;
  @inject("Factory<BaseNodeEntity>") protected nodeEntityFactory: (data: any) => BaseNodeEntity;

  constructor() {
    super();
    this.nodeService = container.get(NodeService); // inject bug?
    this.tableService = container.get(TableService);
    this.logs = {};
    this.statuses = {};
  }

  initialize(server: HttpServer) {
    this.io = socketIo(server);
    this.io.sockets.on("connection", this.onConnection);
  }

  private onConnection = (socket: SocketIO.Socket) => {
    socket.on("send", this.onSend);
    socket.on("logs", this.onRequestLogs);
    socket.on("server::start", this.onWrap(this.startServer));
    socket.on("server::stop", this.onWrap(this.stopServer));
    socket.on("node::find", this.onWrap(this.findNode));
    socket.on("node::add", this.onWrap(this.addNode));
    socket.on("node::edit", this.onWrap(this.editNode));
    socket.on("node::remove", this.onWrap(this.removeNode));
    for (let _id in this.logs) {
      let log: ISocketIoLogData = _.last(this.logs[_id]);
      socket.emit("log", log);
    }
    for (let _id in this.statuses)
      socket.emit("status", this.statuses[_id]);
  };

  private onSend = (data: ISocketIoSendData) => {
    let node = this.nodeService.getNodeById(data._id);
    if (node) node.run(...data.args);
  };

  private onRequestLogs = (data: ISocketIoRequestLogsData, ack: (data: any) => void) => {
    let response: ISocketIoResponseLogsData = {_id: data._id, logs: []};
    let length = this.logs[data._id].length;
    let start = length - data.page * data.limit;
    let end = start + data.limit;
    if (start < 0) start = 0;
    if (end < 0) end = 0;
    response.logs = this.logs[data._id].slice(start, end);
    ack(response);
  };

  private onWrap = (func: (...args: any[]) => Promise<any>) => {
    return (...args: any[]) => {
      let ack: (data: any) => void = _.last(args);
      let funcArgs: any[] = _.initial(args);
      (<Promise<any>>func.call(this, ...funcArgs)).then(data => {
        ack(data);
      }).catch(err => {
        logger.error(err);
      });
    };
  };

  async startServer(): Promise<void> {
    logger.info("Server node initialize started.");
    await this.nodeService.initialize();
    logger.info("Server node initialize finished.");
  }

  async stopServer(): Promise<void> {
    logger.info("Server node destruct started.");
    await this.nodeService.finalize();
    logger.info("Server node destruct finished.");
  }

  private async findNode<T extends BaseNodeEntity>(query: ISocketIoFindQuery): Promise<T[]> {
    return await this.tableService.find<T>(query);
  }

  private async addNode<T extends BaseNodeEntity>(data: Object): Promise<T> {
    let entity = <T>this.nodeEntityFactory(data);
    let newEntity = await this.tableService.insert<T>(entity);
    this.status(newEntity._id, "stop");
    return newEntity;
  }

  private async editNode<T extends BaseNodeEntity>(data: Object): Promise<T> {
    let entity = <T>this.nodeEntityFactory(data);
    let updatedEntity = await this.tableService.update<T>(entity);
    return updatedEntity;
  }

  private async removeNode<T extends BaseNodeEntity>(data: Object): Promise<true> {
    let entity = <T>this.nodeEntityFactory(data);
    await this.tableService.remove(entity);
    return true;
  }

  run(_id: string): void {
    let data: ISocketIoData = {_id: _id};
    this.io.sockets.emit("run", data);
  }

  log(_id: string, level: TSocketIoLogLevel, message: string): void {
    if (!this.logs[_id]) this.logs[_id] = [];
    let no = _.size(this.logs[_id]);
    let log: ISocketIoLogData = {_id: _id, no: no, level: level, message: message, timestamp: (new Date()).toISOString(), };
    this.logs[_id].push(log);
    this.io.sockets.emit("log", log);
  }

  status(_id: string, status: TSocketIoStatus): void {
    let data: ISocketIoStatusData = {_id: _id, status: status};
    this.statuses[_id] = data;
    this.io.sockets.emit("status", data);
  }

}
