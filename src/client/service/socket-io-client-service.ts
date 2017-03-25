import {injectable} from "inversify";
import socketIo = require("socket.io-client");
import Socket = SocketIOClient.Socket;
import _ = require("lodash");

import {BaseService} from "./base-service";
import {
  ISocketIoLogData, ISocketIoStatusData, TSocketIoStatus,
  ISocketIoSendData, ISocketIoData, ISocketIoResponseLogsData, ISocketIoRequestLogsData
} from "../../common/util/socket-io-util";
import BaseNodeComponent from "../component/node/base-node-component";
import {BaseEntity} from "../../common/entity/base-entity";
import {logger} from "../logger";

@injectable()
export class SocketIoClientService extends BaseService {

  private socket: Socket;
  private components: {[_id: string]: BaseNodeComponent<BaseEntity>};
  private lastLogs: {[_id: string]: ISocketIoLogData};
  private statuses: {[_id: string]: ISocketIoStatusData};

  constructor() {
    super();
    this.components = {};
    this.lastLogs = {};
    this.statuses = {};
  }

  initialize() {
    this.socket = socketIo.connect();
    this.socket.on("connect", this.onConnect);
    this.socket.on("disconnect", this.onDisconnect);
    this.socket.on("run", this.onRun);
    this.socket.on("log", this.onLog);
    this.socket.on("status", this.onStatus);
  }

  private onConnect = () => {
    logger.debug("connected");
  };

  private onDisconnect = () => {
    logger.debug("disconnected");
    for (let _id in this.components) {
      this.components[_id].status = "connecting";
      this.components[_id].clearLog();
      this.statuses[_id].status = "connecting";
      this.lastLogs[_id] = null;
    }
  };

  private onRun = (data: ISocketIoData) => {
    if (this.components[data._id]) this.components[data._id].notifyRun();
  };

  private onLog = (data: ISocketIoLogData) => {
    this.lastLogs[data._id] = data;
    if (this.components[data._id]) this.components[data._id].setLastLog(data);
  };

  private onStatus = (data: ISocketIoStatusData) => {
    logger.debug(`status change, id=${data._id} status=${data.status}`);
    if (this.components[data._id])
      this.components[data._id].status = data.status;
    this.statuses[data._id] = data;
  };

  registerComponent(component: BaseNodeComponent<BaseEntity>) {
    this.components[component.entity._id] = component;
  }

  unregisterComponent(_id: string) {
    delete this.components[_id];
  }

  getNodeOptions(filter: string): {[_id: string]: string} {
    let components: {[_id: string]: BaseNodeComponent<BaseEntity>} = _.pickBy<{[_id: string]: BaseNodeComponent<BaseEntity>}, {[_id: string]: BaseNodeComponent<BaseEntity>}>(this.components, component => !filter || filter == component.EntityClass.params.tableName);
    return _.mapValues(components, (component: BaseNodeComponent<BaseEntity>) => component.title)
  }

  getStatus(_id: string): TSocketIoStatus {
    return this.statuses[_id] ? this.statuses[_id].status : "connecting";
  }

  getLastLog(_id: string): ISocketIoLogData {
    return this.lastLogs[_id] || null;
  }

  getLogs(_id: string, page: number, limit: number): Promise<ISocketIoLogData[]> {
    return new Promise((resolve) => {
      let request: ISocketIoRequestLogsData = {_id: _id, page: page, limit: limit};
      this.socket.emit("logs", request, (data: ISocketIoResponseLogsData) => {
        resolve(data.logs);
      });
    });
  }

  send(_id: string, ...args: any[]) {
    let sendData: ISocketIoSendData = {_id: _id, args: args};
    this.socket.emit("send", sendData);
  }

}
