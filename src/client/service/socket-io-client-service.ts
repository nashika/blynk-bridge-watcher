import {injectable} from "inversify";
import socketIo = require("socket.io-client");
import Socket = SocketIOClient.Socket;

import {BaseClientService} from "./base-client-service";
import {logger} from "../logger";

@injectable()
export class SocketIoClientService extends BaseClientService {

  private socket: Socket;
  private connectDiffered: () => void;

  constructor() {
    super();
  }

  async initialize(): Promise<void> {
    this.socket = socketIo.connect();
    this.on(this, "connect", this.onConnect);
    this.on(this, "disconnect", this.onDisconnect);
    return new Promise<void>(resolve => this.connectDiffered = resolve);
  }

  on(me: Object, event: string, func: Function) {
    this.socket.on(event, (...args: any[]) => {
      func.call(me, ...args);
    });
  }

  private async onConnect(): Promise<void> {
    logger.debug("connected");
    this.connectDiffered();
  }

  private async onDisconnect(): Promise<void> {
    logger.debug("disconnected");
  }

  async request<T>(event: string, params?: any): Promise<T> {
    return await new Promise<T>((resolve) => {
      this.socket.emit(event, params, (data: T) => resolve(data));
    });
  }

}
