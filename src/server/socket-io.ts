import socketIo = require("socket.io");
import {Server as HttpServer} from "http";
import Server = SocketIO.Server;
import Socket = SocketIO.Socket;

import {ISocketIoLogData, ISocketIoStatusData, TSocketIoStatus, TSocketIoLogLevel} from "../common/util/socket-io-util";

export class SocketIoServer {

  protected io: Server;
  protected logs: ISocketIoLogData[];
  protected statuses: {[_id: string]: ISocketIoStatusData};

  constructor() {
    this.logs = [];
    this.statuses = {};
  }

  initialize(server: HttpServer) {
    this.io = socketIo(server);
    this.io.sockets.on("connection", socket => {
      for (let log of this.logs)
        socket.emit("log", log);
      for (let _id in this.statuses)
        socket.emit("status", this.statuses[_id]);
      socket.on("client_to_server", (data: any) => {
        // client to server
      });
    });
  }

  log(_id: string, level: TSocketIoLogLevel, message: string) {
    let data: ISocketIoLogData = {_id: _id, level: level, message: message, timestamp: (new Date()).toISOString()};
    this.logs.push(data);
    this.io.sockets.emit("log", data);
  }

  status(_id: string, status: TSocketIoStatus) {
    let data: ISocketIoStatusData = {_id: _id, status: status};
    this.statuses[_id] = data;
    this.io.sockets.emit("status", data);
  }

}

export var socketIoServer = new SocketIoServer();
