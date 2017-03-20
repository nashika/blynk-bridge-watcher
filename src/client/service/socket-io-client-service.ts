import {injectable} from "inversify";
import socketIo = require("socket.io-client");
import Socket = SocketIOClient.Socket;
import _ = require("lodash");

import {BaseService} from "./base-service";
import {
  ISocketIoLogData, ISocketIoStatusData, TSocketIoStatus,
  ISocketIoSendData, ISocketIoData, ISocketIoCountLogData, ISocketIoResponseLogsData, ISocketIoRequestLogsData
} from "../../common/util/socket-io-util";
import {BaseNodeComponent} from "../component/node/base-node-component";
import {BaseEntity} from "../../common/entity/base-entity";

@injectable()
export class SocketIoClientService extends BaseService {

  private socket: Socket;
  private components: {[_id: string]: BaseNodeComponent<BaseEntity>};
  private countLogs: {[_id: string]: number};
  private statuses: {[_id: string]: ISocketIoStatusData};

  constructor() {
    super();
    this.components = {};
    this.countLogs = {};
    this.statuses = {};
  }

  initialize() {
    this.socket = socketIo.connect();
    this.socket.on("connect", this.onConnect);
    this.socket.on("disconnect", this.onDisconnect);
    this.socket.on("run", this.onRun);
    this.socket.on("countLog", this.onCountLog);
    this.socket.on("status", this.onStatus);
  }

  private onConnect = () => {
  };

  private onDisconnect = () => {
    for (let _id in this.components) {
      this.components[_id].status = "connecting";
      this.components[_id].clearLog();
      this.statuses[_id].status = "connecting";
      this.countLogs[_id] = 0;
    }
  };

  private onRun = (data: ISocketIoData) => {
    if (this.components[data._id]) this.components[data._id].notifyRun();
  };

  private onCountLog = (data: ISocketIoCountLogData) => {
    this.countLogs[data._id] = data.count;
    if (this.components[data._id]) this.components[data._id].setCountLog(data.count);
  };

  private onStatus = (data: ISocketIoStatusData) => {
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

  getCountLog(_id: string): number {
    return this.countLogs[_id] || 0;
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
