import _ = require("lodash");
import {injectable, inject} from "inversify";

import {BaseClientService} from "./base-client-service";
import {BaseNodeEntity} from "../../common/entity/node/base-node-entity";
import {SocketIoClientService} from "./socket-io-client-service";
import {
  ISocketIoData,
  ISocketIoFindQuery, ISocketIoLogData, ISocketIoRequestLogsData,
  ISocketIoResponseLogsData, ISocketIoSendData, ISocketIoStatusData, TSocketIoStatus
} from "../../common/util/socket-io-util";
import {logger} from "../logger";
import NodeComponent from "../component/node-component";

@injectable()
export class NodeClientService extends BaseClientService {

  private components: { [_id: string]: NodeComponent<BaseNodeEntity> };
  private lastLogs: { [_id: string]: ISocketIoLogData };
  private statuses: { [_id: string]: ISocketIoStatusData };

  constructor(@inject("Factory<BaseNodeEntity>") protected entityFactory: (data: any) => BaseNodeEntity,
              protected socketIoClientService: SocketIoClientService) {
    super();
    this.components = {};
    this.lastLogs = {};
    this.statuses = {};
  }

  initialize() {
    this.socketIoClientService.on(this, "connect", this.onConnect);
    this.socketIoClientService.on(this, "disconnect", this.onDisconnect);
    this.socketIoClientService.on(this, "node::run", this.onRun);
    this.socketIoClientService.on(this, "node::log", this.onLog);
    this.socketIoClientService.on(this, "node::status", this.onStatus);
  }

  async onConnect(): Promise<void> {
  }

  async onDisconnect(): Promise<void> {
    for (let _id in this.components) {
      this.components[_id].status = "connecting";
      this.components[_id].clearLog();
      this.statuses[_id].status = "connecting";
      this.lastLogs[_id] = null;
    }
  }

  private async onRun(data: ISocketIoData): Promise<void> {
    if (this.components[data._id]) this.components[data._id].notifyRun();
  }

  private async onLog(data: ISocketIoLogData): Promise<void> {
    this.lastLogs[data._id] = data;
    if (this.components[data._id]) this.components[data._id].setLastLog(data);
  }

  private async onStatus(data: ISocketIoStatusData): Promise<void> {
    logger.debug(`status change, id=${data._id} status=${data.status}`);
    if (this.components[data._id])
      this.components[data._id].status = data.status;
    this.statuses[data._id] = data;
  };

  async start(): Promise<void> {
    await this.socketIoClientService.request("server::start");
  }

  async stop(): Promise<void> {
    await this.socketIoClientService.request("server::stop");
  }

  async send(_id: string, ...args: any[]): Promise<void> {
    let sendData: ISocketIoSendData = {_id: _id, args: args};
    await this.socketIoClientService.request("node::send", sendData);
  }

  async logs(_id: string, page: number, limit: number): Promise<ISocketIoLogData[]> {
    let param: ISocketIoRequestLogsData = {_id: _id, page: page, limit: limit};
    let res = await this.socketIoClientService.request<ISocketIoResponseLogsData>("node::logs", param);
    return res.logs;
  }

  async findOne<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, id: string = ""): Promise<T> {
    let query = id ? {_id: id} : {};
    let entities = await this.getAll<T>(EntityClass, query);
    if (entities.length == 0) return null;
    return entities[0];
  }

  async findChildren<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, parent: string): Promise<T[]> {
    return await this.getAll<T>(EntityClass, {_parent: parent});
  }

  async getAll<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, query: ISocketIoFindQuery = {}): Promise<T[]> {
    query.type = EntityClass.params.type;
    let datas = await this.socketIoClientService.request<Object[]>("node::find", query);
    if (!_.isArray(datas)) throw new Error(`node::find expects entity data array.`);
    return _.map(datas, data => <T>this.entityFactory(data));
  }

  async add<T extends BaseNodeEntity>(entity: T): Promise<T> {
    this.prepareEntity(entity);
    let data = await this.socketIoClientService.request<Object>("node::add", entity);
    return <T>this.entityFactory(data);
  }

  async edit<T extends BaseNodeEntity>(entity: T): Promise<T> {
    this.prepareEntity(entity);
    let data = await this.socketIoClientService.request<Object>("node::edit", entity);
    return <T>this.entityFactory(data);
  }

  async remove<T extends BaseNodeEntity>(entity: T): Promise<void> {
    this.prepareEntity(entity);
    await this.socketIoClientService.request<void>("node::remove", entity);
  }

  private prepareEntity<T extends BaseNodeEntity>(entity: T): T {
    for (let key of _.keys(entity)) {
      let value = _.get(entity, key);
      let field = entity.Class.params.fields[key];
      if (field) {
        switch (field.type) {
          case "text":
            if (!value) _.unset(entity, key);
            break;
          case "number":
            if (value === "") _.unset(entity, key);
            break;
        }
      } else {
        _.unset(entity, key);
      }
    }
    entity.type = entity.Class.params.type;
    entity.subType = entity.Class.params.subType;
    return entity;
  }

  registerComponent(component: NodeComponent<BaseNodeEntity>) {
    this.components[component.entity._id] = component;
  }

  unregisterComponent(id: string) {
    delete this.components[id];
  }

  getComponent(id: string): NodeComponent<BaseNodeEntity> {
    return this.components[id];
  }

  getNodeOptions(filter: string): { text: string, value: string }[] {
    let components = _.filter<NodeComponent<BaseNodeEntity>>(this.components, component => {
      if (filter && filter != component.EntityClass.params.type) return false;
      if (component.EntityClass.params.input == "none") return false;
      return true;
    });
    let result = _.map(components, component => {
      return {text: component.title, value: component.id};
    });
    result.unshift({text: "Select Node", value: ""});
    return result;
  }

  getStatus(id: string): TSocketIoStatus {
    return this.statuses[id] ? this.statuses[id].status : "connecting";
  }

  getLastLog(id: string): ISocketIoLogData {
    return this.lastLogs[id] || null;
  }

}
