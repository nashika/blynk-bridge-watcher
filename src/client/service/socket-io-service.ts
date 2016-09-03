import socketIo = require("socket.io-client");
import {BaseService} from "./base-service";
import Socket = SocketIOClient.Socket;
import {ISocketIoLogData, ISocketIoStatusData} from "../../common/util/socket-io-util";
import {BaseEntityComponent} from "../component/base-entity-component";
import {BaseEntity} from "../../common/entity/base-entity";

export class SocketIoService extends BaseService {

  protected socket: Socket;
  protected components: {[_id:string]:BaseEntityComponent<BaseEntity>};

  constructor() {
    super();
    this.components = {};
  }

  initialize() {
    this.socket = socketIo.connect();
    this.socket.on("log", this.log);
    this.socket.on("status", this.status);
  }

  registerComponent(component:BaseEntityComponent<BaseEntity>) {
    this.components[component.entity._id] = component;
  }

  unregisterComponent(_id: string) {
    delete this.components[_id];
  }

  protected log = (data: ISocketIoLogData) => {
    console.log(`${data._id} [${data.level}] ${data.message}`);
  };

  protected status = (data: ISocketIoStatusData) => {
    if (this.components[data._id])
      this.components[data._id].status = data.status;
    console.log(`${data._id} ${data.status}`);
  }

}
