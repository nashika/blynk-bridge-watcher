import socketIo = require("socket.io-client");
import {BaseService} from "./base-service";
import Socket = SocketIOClient.Socket;
import _ = require("lodash");

import {
  ISocketIoLogData, ISocketIoStatusData, TSocketIoStatus,
  ISocketIoSendData, ISocketIoData
} from "../../common/util/socket-io-util";
import {BaseNodeComponent} from "../component/node/base-node-component";
import {BaseEntity} from "../../common/entity/base-entity";

export class SocketIoClientService extends BaseService {

  protected socket: Socket;
  protected components: {[_id: string]: BaseNodeComponent<BaseEntity>};
  protected logs: ISocketIoLogData[];
  protected statuses: {[_id: string]: ISocketIoStatusData};

  constructor() {
    super();
    this.components = {};
    this.logs = [];
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
  };

  private onDisconnect = () => {
    for (let _id in this.components) {
      this.components[_id].status = "connecting";
      this.components[_id].clearLog();
      this.statuses[_id].status = "connecting";
    }
    this.logs = [];
  };

  private onRun = (data: ISocketIoData) => {
    if (this.components[data._id]) this.components[data._id].notifyRun();
  };

  private onLog = (data: ISocketIoLogData) => {
    this.logs.push(data);
    if (this.components[data._id]) this.components[data._id].addLog(data);
    console.log(`${data._id} [${data.level}] ${data.message}`);
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

  getLogs(_id: string): ISocketIoLogData[] {
    return this.logs.filter(log => log._id == _id);
  }

  send(_id: string, ...args: any[]) {
    let sendData: ISocketIoSendData = {_id: _id, args: args};
    this.socket.emit("send", sendData);
  }

}
