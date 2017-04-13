import {inject, injectable} from "inversify";
import _ = require("lodash");
import {getLogger} from "log4js";
import moment = require("moment");

import {BaseServerService} from "./base-server-service";
import {TableServerService} from "./table-server-service";
import {ServerNode} from "../node/server-node";
import {ServerNodeEntity} from "../../common/entity/node/server-node-entity";
import {BaseNode} from "../node/base-node";
import {container} from "../../common/inversify.config";
import {BaseNodeEntity} from "../../common/entity/node/base-node-entity";
import {SocketIoServerService} from "./socket-io-server-service";
import {
  ISocketIoData, ISocketIoFindQuery,
  ISocketIoLogData, ISocketIoRequestLogsData, ISocketIoResponseLogsData, ISocketIoSendData,
  ISocketIoStatusData, TSocketIoLogLevel, TSocketIoStatus
} from "../../common/util/socket-io-util";
import {uid} from "../../common/util/uid";

let logger = getLogger("system");
let tableName = "nodes";

@injectable()
export class NodeServerService extends BaseServerService {

  private serverNode: ServerNode;
  private nodes: { [_id: string]: BaseNode<BaseNodeEntity> };
  private logs: { [_id: string]: ISocketIoLogData[] };
  private statuses: { [_id: string]: ISocketIoStatusData };

  constructor(protected tableServerService: TableServerService,
              protected socketIoServerService: SocketIoServerService,
              @inject("Factory<BaseNodeEntity>") protected nodeEntityFactory: (data: any) => BaseNodeEntity) {
    super();
    this.nodes = {};
    this.logs = {};
    this.statuses = {};
  }

  async initialize(): Promise<void> {
    logger.info("Server node initialize started.");
    let serverEntity = await this.findOne({type: "server"});
    if (!serverEntity) {
      serverEntity = await this.insert(ServerNodeEntity.generateDefault());
    }
    this.serverNode = <ServerNode>await this.generate(null, serverEntity);
    await this.serverNode.startWrap();
    logger.info("Server node initialize finished.");
  }

  async finalize(): Promise<void> {
    logger.info("Server node destruct started.");
    await this.serverNode.finalizeWrap();
    delete this.serverNode;
    logger.info("Server node destruct finished.");
  }

  async generate(parent: BaseNode<BaseNodeEntity>, entity: BaseNodeEntity): Promise<BaseNode<BaseNodeEntity>> {
    let result: BaseNode<BaseNodeEntity> = container.getNamed(BaseNode, _.camelCase((entity.Class.params.subType ? entity.Class.params.subType + "_" : "") + entity.Class.params.type));
    result.entity = entity;
    result.parent = parent;
    result.log("debug", `Generate ${result.constructor.name} object was started.`);
    result.status = "processing";
    await result.initializeWrap();
    result.log("debug", `Generate ${result.constructor.name} object was finished.`);
    return result;
  }

  onConnect(socket: SocketIO.Socket) {
    this.socketIoServerService.on(this, socket, "server::start", this.onStartServer);
    this.socketIoServerService.on(this, socket, "server::stop", this.onStopServer);
    this.socketIoServerService.on(this, socket, "node::send", this.onSend);
    this.socketIoServerService.on(this, socket, "node::logs", this.onLogs);
    this.socketIoServerService.on(this, socket, "node::find", this.onFind);
    this.socketIoServerService.on(this, socket, "node::add", this.onAdd);
    this.socketIoServerService.on(this, socket, "node::edit", this.onEdit);
    this.socketIoServerService.on(this, socket, "node::remove", this.onRemove);
    for (let _id in this.logs) {
      let log: ISocketIoLogData = _.last(this.logs[_id]);
      socket.emit("node::log", log);
    }
    for (let _id in this.statuses)
      socket.emit("node::status", this.statuses[_id]);
  };

  private async onStartServer(): Promise<void> {
    await this.initialize();
  }

  private async onStopServer(): Promise<void> {
    await this.finalize();
  }

  private async onSend(data: ISocketIoSendData): Promise<void> {
    let node = this.getNodeById(data._id);
    if (node) node.run(...data.args);
  }

  private async onLogs(data: ISocketIoRequestLogsData): Promise<ISocketIoResponseLogsData> {
    let response: ISocketIoResponseLogsData = {_id: data._id, logs: []};
    let length = this.logs[data._id].length;
    let start = length - data.page * data.limit;
    let end = start + data.limit;
    if (start < 0) start = 0;
    if (end < 0) end = 0;
    response.logs = _.reverse(this.logs[data._id].slice(start, end));
    return response;
  }

  private async onFind<T extends BaseNodeEntity>(query: ISocketIoFindQuery): Promise<T[]> {
    return await this.find<T>(query);
  }

  private async onAdd<T extends BaseNodeEntity>(data: Object): Promise<T> {
    let entity = <T>this.nodeEntityFactory(data);
    let newEntity = await this.insert<T>(entity);
    this.status(newEntity._id, "stop");
    return newEntity;
  }

  private async onEdit<T extends BaseNodeEntity>(data: Object): Promise<T> {
    let entity = <T>this.nodeEntityFactory(data);
    let updatedEntity = await this.update<T>(entity);
    return updatedEntity;
  }

  private async onRemove<T extends BaseNodeEntity>(data: Object): Promise<true> {
    let entity = <T>this.nodeEntityFactory(data);
    await this.remove(entity._id);
    return true;
  }

  async find<T extends BaseNodeEntity>(query: ISocketIoFindQuery = {}): Promise<T[]> {
    let datas = await this.tableServerService.find(tableName, query);
    return datas.map(data => <T>this.nodeEntityFactory(data));
  }

  async findOne<T extends BaseNodeEntity>(query: ISocketIoFindQuery = {}): Promise<T> {
    let data = await this.tableServerService.findOne(tableName, query);
    return data ? <T>this.nodeEntityFactory(data) : null;
  }

  async findById<T extends BaseNodeEntity>(id: string): Promise<T> {
    return await this.findOne<T>({_id: id});
  }

  async insert<T extends BaseNodeEntity>(entity: T): Promise<T> {
    let newId: string;
    while (!newId || await this.findById(newId)) {
      newId = uid(4);
    }
    entity._id = newId;
    let newData = await this.tableServerService.insert(tableName, entity);
    return <T>this.nodeEntityFactory(newData);
  }

  async update<T extends BaseNodeEntity>(entity: T): Promise<T> {
    let data = await this.tableServerService.update(tableName, entity);
    return <T>this.nodeEntityFactory(data);
  }

  async remove(id: string): Promise<void> {
    await this.tableServerService.remove(tableName, id);
    let childEntities = await this.find({_parent: id});
    for (let childEntity of childEntities) {
      await this.remove(childEntity._id);
    }
  }

  run(_id: string): void {
    let data: ISocketIoData = {_id: _id};
    this.socketIoServerService.emitAll("node::run", data);
  }

  log(_id: string, level: TSocketIoLogLevel, message: string): void {
    if (!this.logs[_id]) this.logs[_id] = [];
    let no = _.size(this.logs[_id]);
    let log: ISocketIoLogData = {
      _id: _id,
      no: no,
      level: level,
      message: message,
      timestamp: moment().toISOString(),
    };
    this.logs[_id].push(log);
    this.socketIoServerService.emitAll("node::log", log);
  }

  status(_id: string, status: TSocketIoStatus): void {
    let data: ISocketIoStatusData = {_id: _id, status: status};
    this.statuses[_id] = data;
    this.socketIoServerService.emitAll("node::status", data);
  }

  register(node: BaseNode<BaseNodeEntity>): void {
    this.nodes[node.entity._id] = node;
  }

  unregister(_id: string): void {
    delete this.nodes[_id];
  }

  getNodeById(id: string): BaseNode<BaseNodeEntity> {
    return _.find(this.nodes, (_node: BaseNode<BaseNodeEntity>, _id: string) => _.startsWith(_id, id));
  }

  getNodesByType(type: string = ""): BaseNode<BaseNodeEntity>[] {
    return _.filter(this.nodes, node => !type || type == node.EntityClass.params.type);
  }

}
