import request = require("superagent");

import {BaseService} from "./base-service";
import {BaseEntity} from "../../common/entity/base-entity";
import _ = require("lodash");

export class EntityService extends BaseService {

  getOne<T extends BaseEntity>(EntityClass: typeof BaseEntity, id: string = ""): Promise<T> {
    let url: string;
    if (id) {
      url = `/${EntityClass.modelName}/${id}`;
    } else {
      url = `/${EntityClass.modelName}`;
    }
    return request.get(url).then(res => {
      if (!_.isObject(res.body)) throw new Error(`getOne expects one entity object.`);
      return <T>new EntityClass(res.body);
    });
  }

  getChildren<T extends BaseEntity>(EntityClass: typeof BaseEntity, parent:string): Promise<T[]> {
    return this.getAll(EntityClass, {_parent: parent});
  }

  getAll<T extends BaseEntity>(EntityClass: typeof BaseEntity, query:any): Promise<T[]> {
    let url: string = `/${EntityClass.modelName}`;
    return request.post(url).send(query).then(res => {
      if (!_.isArray(res.body)) throw new Error(`getAll expects entity array.`);
      return _.map(res.body, data => <T>new EntityClass(data));
    });
  }

  add<T extends BaseEntity>(entity:T): Promise<T> {
    let url: string = `/${entity.Class.modelName}/add`;
    return request.post(url).send(entity).then(res => {
      return <T>new entity.Class(res.body);
    });
  }

  edit<T extends BaseEntity>(entity:T): Promise<T> {
    let url: string = `/${entity.Class.modelName}/edit`;
    return request.post(url).send(entity).then(res => {
      return <T>new entity.Class(res.body);
    });
  }

  delete<T extends BaseEntity>(entity:T): Promise<void> {
    let url: string = `/${entity.Class.modelName}/delete`;
    return request.post(url).send(entity).then(res => {
      return;
    });
  }

}
