import request = require("superagent");
import _ = require("lodash");
import {injectable, inject} from "inversify";

import {BaseService} from "./base-service";
import {BaseEntity} from "../../common/entity/base-entity";

@injectable()
export class EntityService extends BaseService {

  constructor(@inject("Factory<BaseEntity>") protected entityFactory: (tableName: string, data: any) => BaseEntity) {
    super();
  }

  getOne<T extends BaseEntity>(EntityClass: typeof BaseEntity, id: string = ""): Promise<T> {
    let url: string;
    if (id) {
      url = `/${EntityClass.params.tableName}/${id}`;
    } else {
      url = `/${EntityClass.params.tableName}`;
    }
    return request.get(url).then(res => {
      if (!_.isObject(res.body)) throw new Error(`getOne expects one entity object.`);
      return <T>this.entityFactory(EntityClass.params.tableName, res.body);
    });
  }

  getChildren<T extends BaseEntity>(EntityClass: typeof BaseEntity, parent: string): Promise<T[]> {
    return this.getAll(EntityClass, {_parent: parent});
  }

  getAll<T extends BaseEntity>(EntityClass: typeof BaseEntity, query: any): Promise<T[]> {
    let url: string = `/${EntityClass.params.tableName}`;
    return request.post(url).send(query).then(res => {
      if (!_.isArray(res.body)) throw new Error(`getAll expects entity array.`);
      return _.map(res.body, data => <T>this.entityFactory(EntityClass.params.tableName, data));
    });
  }

  add<T extends BaseEntity>(entity: T): Promise<T> {
    this.cleanEntity(entity);
    let url: string = `/${entity.Class.params.tableName}/add`;
    return request.post(url).send(entity).then(res => {
      return <T>this.entityFactory(entity.Class.params.tableName, res.body);
    });
  }

  edit<T extends BaseEntity>(entity: T): Promise<T> {
    this.cleanEntity(entity);
    let url: string = `/${entity.Class.params.tableName}/edit`;
    return request.post(url).send(entity).then(res => {
      return <T>this.entityFactory(entity.Class.params.tableName, res.body);
    });
  }

  private cleanEntity<T extends BaseEntity>(entity: T) {
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

  remove<T extends BaseEntity>(entity: T): Promise<void> {
    let url: string = `/${entity.Class.params.tableName}/remove`;
    return request.post(url).send(entity).then(res => {
      return;
    });
  }

}
