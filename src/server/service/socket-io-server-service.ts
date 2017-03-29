import socketIo = require("socket.io");
import {Server as HttpServer} from "http";
import _ = require("lodash");
import {injectable} from "inversify";
import {getLogger} from "log4js";

import {BaseServerService} from "./base-server-service";
import {container} from "../../common/inversify.config";

let logger = getLogger("system");

@injectable()
export class SocketIoServerService extends BaseServerService {

  private io: SocketIO.Server;

  initialize(server: HttpServer) {
    this.io = socketIo(server);
    this.io.sockets.on("connect", this.onConnect);
  }

  private onConnect = (socket: SocketIO.Socket) => {
    for (let service of container.getAll("SocketIoService"))
      (<any>service).onConnect(socket);
  };

  on(me: Object, socket: SocketIO.Socket, event: string, func: (...args: any[]) => Promise<any>) {
    socket.on(event, (...args: any[]) => {
      let ack: (data: any) => void = _.last(args);
      let funcArgs: any[] = _.initial(args);
      (<Promise<any>>func.call(me, ...funcArgs)).then(data => {
        ack(data);
      }).catch(err => {
        logger.error(err);
      });
    });
  }

  emitAll(event: string, ...args: any[]) {
    this.io.sockets.emit(event, ...args);
  }

}
