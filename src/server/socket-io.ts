import socketIo = require("socket.io");
import {Server as HttpServer} from "http";
import Server = SocketIO.Server;
import Socket = SocketIO.Socket;
import _ = require("lodash");

import {
  ISocketIoLogData, ISocketIoStatusData, TSocketIoStatus, TSocketIoLogLevel,
  ISocketIoSendData
} from "../common/util/socket-io-util";
import {BaseNode} from "./node/base-node";
import {BaseEntity} from "../common/entity/base-entity";

export class SocketIoServer {

  private io: Server;
  private logs: ISocketIoLogData[];
  private statuses: {[_id: string]: ISocketIoStatusData};
  private nodes: {[_id: string]: BaseNode<BaseEntity>};

  constructor() {
    this.logs = [];
    this.statuses = {};
    this.nodes = {};
  }

  initialize(server: HttpServer) {
    this.io = socketIo(server);
    this.io.sockets.on("connection", socket => {
      socket.on("send", this.onSend);
      for (let log of this.logs)
        socket.emit("log", log);
      for (let _id in this.statuses)
        socket.emit("status", this.statuses[_id]);
      socket.on("client_to_server", (data: any) => {
        // client to server
      });
    });
  }

  private onSend = (data: ISocketIoSendData) => {
    let node = this.nodes[data._id];
    if (node) node.run(...data.args);
  };

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

  registerNode(node: BaseNode<BaseEntity>): void {
    this.nodes[node.entity._id] = node;
  }

  unregisterNode(_id: string): void {
    delete this.nodes[_id];
  }

  getNode(id: string): BaseNode<BaseEntity> {
    return _.find(this.nodes, (node: BaseNode<BaseEntity>, _id:string) => _.startsWith(_id, id));
  }

}

export var socketIoServer = new SocketIoServer();
