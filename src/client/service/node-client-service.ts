import _ = require("lodash");
import {injectable, inject} from "inversify";

import {BaseClientService} from "./base-client-service";
import {BaseNodeEntity} from "../../common/entity/node/base-node-entity";
import {SocketIoClientService} from "./socket-io-client-service";
import {ISocketIoFindQuery} from "../../common/util/socket-io-util";

@injectable()
export class NodeClientService extends BaseClientService {

  constructor(@inject("Factory<BaseNodeEntity>") protected entityFactory: (data: any) => BaseNodeEntity,
              protected socketIoClientService: SocketIoClientService) {
    super();
  }

  async start(): Promise<void> {
    await this.socketIoClientService.request("server::start");
  }

  async stop(): Promise<void> {
    await this.socketIoClientService.request("server::stop");
  }

  async getOne<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, id: string = ""): Promise<T> {
    let query = id ? {_id: id} : {};
    let entities = await this.getAll<T>(EntityClass, query);
    if (entities.length == 0) return null;
    return entities[0];
  }

  async getChildren<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, parent: string): Promise<T[]> {
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

}
