import socketIo = require("socket.io");
import {Server as HttpServer} from "http";
import Server = SocketIO.Server;
import _ = require("lodash");
import {injectable} from "inversify";

import {
  ISocketIoLogData, ISocketIoStatusData, TSocketIoStatus, TSocketIoLogLevel,
  ISocketIoSendData, ISocketIoData, ISocketIoCountLogData, ISocketIoRequestLogsData, ISocketIoResponseLogsData
} from "../../common/util/socket-io-util";
import {BaseServerService} from "./base-server-service";
import {NodeService} from "./node-service";
import {container} from "../../common/inversify.config";

@injectable()
export class SocketIoServerService extends BaseServerService {

  private io: Server;
  private logs: {[_id: string]: ISocketIoLogData[]};
  private statuses: {[_id: string]: ISocketIoStatusData};

  protected nodeService: NodeService;

  constructor() {
    super();
    this.nodeService = container.get(NodeService); // inject bug?
    this.logs = {};
    this.statuses = {};
  }

  initialize(server: HttpServer) {
    this.io = socketIo(server);
    this.io.sockets.on("connection", socket => {
      socket.on("send", this.onSend);
      socket.on("logs", this.onRequestLogs);
      for (let _id in this.logs) {
        let data: ISocketIoCountLogData = {_id: _id, count: _.size(this.logs[_id])};
        socket.emit("countLog", data);
      }
      for (let _id in this.statuses)
        socket.emit("status", this.statuses[_id]);
      socket.on("client_to_server", (_data: any) => {
        // client to server
      });
    });
  }

  private onSend = (data: ISocketIoSendData) => {
    let node = this.nodeService.getNode(data._id);
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

  run(_id: string): void {
    let data: ISocketIoData = {_id: _id};
    this.io.sockets.emit("run", data);
  }

  log(_id: string, level: TSocketIoLogLevel, message: string): void {
    let log: ISocketIoLogData = {_id: _id, level: level, message: message, timestamp: (new Date()).toISOString()};
    if (!this.logs[_id]) this.logs[_id] = [];
    this.logs[_id].push(log);
    let data: ISocketIoCountLogData = {_id: _id, count: _.size(this.logs[_id])};
    this.io.sockets.emit("countLog", data);
  }

  status(_id: string, status: TSocketIoStatus): void {
    let data: ISocketIoStatusData = {_id: _id, status: status};
    this.statuses[_id] = data;
    this.io.sockets.emit("status", data);
  }

}
