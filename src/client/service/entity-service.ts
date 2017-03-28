import request = require("superagent");
import _ = require("lodash");
import {injectable, inject} from "inversify";

import {BaseService} from "./base-service";
import {BaseNodeEntity} from "../../common/entity/node/base-node-entity";

@injectable()
export class EntityService extends BaseService {

  constructor(@inject("Factory<BaseNodeEntity>") protected entityFactory: (tableName: string, data: any) => BaseNodeEntity) {
    super();
  }

  async getOne<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, id: string = ""): Promise<T> {
    let url: string;
    if (id) {
      url = `/${EntityClass.params.tableName}/${id}`;
    } else {
      url = `/${EntityClass.params.tableName}`;
    }
    let res = await request.get(url);
    if (!_.isObject(res.body)) throw new Error(`getOne expects one entity object.`);
    return <T>this.entityFactory(EntityClass.params.tableName, res.body);
  }

  async getChildren<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, parent: string): Promise<T[]> {
    return await this.getAll<T>(EntityClass, {_parent: parent});
  }

  async getAll<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, query: any): Promise<T[]> {
    let url: string = `/${EntityClass.params.tableName}`;
    let res = await request.post(url).send(query);
    if (!_.isArray(res.body)) throw new Error(`getAll expects entity array.`);
    return _.map(res.body, data => <T>this.entityFactory(EntityClass.params.tableName, data));
  }

  async add<T extends BaseNodeEntity>(entity: T): Promise<T> {
    this.cleanEntity(entity);
    let url: string = `/${entity.Class.params.tableName}/add`;
    let res = await request.post(url).send(entity);
    return <T>this.entityFactory(entity.Class.params.tableName, res.body);
  }

  async edit<T extends BaseNodeEntity>(entity: T): Promise<T> {
    this.cleanEntity(entity);
    let url: string = `/${entity.Class.params.tableName}/edit`;
    let res = await request.post(url).send(entity);
    return <T>this.entityFactory(entity.Class.params.tableName, res.body);
  }

  private cleanEntity<T extends BaseNodeEntity>(entity: T): T {
    for (let key of Object.keys(entity)) {
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
    return entity;
  }

  async remove<T extends BaseNodeEntity>(entity: T): Promise<void> {
    let url: string = `/${entity.Class.params.tableName}/remove`;
    await request.post(url).send(entity);
  }

}
