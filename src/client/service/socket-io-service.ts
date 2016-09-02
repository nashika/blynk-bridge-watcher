import socketIo = require("socket.io-client");
import {BaseService} from "./base-service";
import Socket = SocketIOClient.Socket;

export class SocketIoService extends BaseService {

  protected socket: Socket;

  constructor() {
    super();
  }

  initialize() {
    this.socket = socketIo.connect();
    this.socket.on("server_to_client", (data: any) => {
      console.log(data);
    });
    setTimeout(() => {
      this.socket.emit("client_to_server", "TEST");
    }, 3000);
  }

}
