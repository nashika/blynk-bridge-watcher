import socketIo = require("socket.io-client");
import {BaseService} from "./base-service";
import Socket = SocketIOClient.Socket;

import {
  ISocketIoLogData, ISocketIoStatusData, TSocketIoStatus,
  ISocketIoSendData
} from "../../common/util/socket-io-util";
import {BaseNodeComponent} from "../component/base-node-component";
import {BaseEntity} from "../../common/entity/base-entity";

export class SocketIoService extends BaseService {

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

  private onLog = (data: ISocketIoLogData) => {
    this.logs.push(data);
    if (this.components[data._id]) this.components[data._id].log(data);
    console.log(`${data._id} [${data.level}] ${data.message}`);
  };

  private onStatus = (data: ISocketIoStatusData) => {
    if (this.components[data._id])
      this.components[data._id].status = data.status;
    this.statuses[data._id] = data;
    console.log(`${data._id} ${data.status}`);
  };

  registerComponent(component: BaseNodeComponent<BaseEntity>) {
    this.components[component.entity._id] = component;
  }

  unregisterComponent(_id: string) {
    delete this.components[_id];
  }

  getStatus(_id: string): TSocketIoStatus {
    return this.statuses[_id] ? this.statuses[_id].status : "connecting";
  }

  send(_id: string, event: string, ...args: any[]) {
    let sendData: ISocketIoSendData = {_id: _id, event: event, args: args};
    this.socket.emit("send", sendData);
  }

}
