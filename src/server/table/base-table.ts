import path = require("path");

import NeDBDataStore = require("nedb");

import {BaseEntity} from "../../common/entity/base-entity";
import {entityRegistry} from "../../common/entity/entity-registry";

export class BaseTable<T extends BaseEntity> {

  static modelName: string;

  db: NeDBDataStore;

  constructor() {
    this.db = new NeDBDataStore({
      filename: path.join(__dirname, `../../../db/${this.Class.modelName}.db`),
      autoload: true,
    });
  }

  get Class(): typeof BaseTable {
    return <typeof BaseTable>this.constructor;
  }

  get EntityClass(): typeof BaseEntity {
    return entityRegistry.getClass(this.Class.modelName);
  }

  find(query: any = {}): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this.db.find<T>(query, (err, docs) => {
        if (err) return reject(err);
        let entities: T[] = docs.map(doc => <T>new this.EntityClass(doc));
        resolve(entities);
      });
    });
  }

  findOne(id: string = ""): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (id) {
        this.db.findOne<T>({_id: id}, (err, doc) => {
          if (err) return reject(err);
          let entity: T = <T>new this.EntityClass(doc);
          resolve(entity);
        });
      } else {
        this.db.find<T>({}).limit(1).exec((err, docs) => {
          if (err) return reject(err);
          let entity: T = docs[0] ? <T>new this.EntityClass(docs[0]) : null;
          resolve(entity);
        });
      }
    });
  }

  insert(entity: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.insert(entity, (err, newDoc) => {
        if (err) return reject(err);
        let entity: T = <T>new this.EntityClass(newDoc);
        resolve(entity);
      });
    });
  }

  update(entity: T): Promise<T> {
    if (!entity._id) throw new Error(`update need _id key`);
    return new Promise((resolve, reject) => {
      this.db.update({_id: entity._id}, entity, {returnUpdatedDocs: true}, err => {
        if (err) return reject(err);
        resolve(entity);
      });
    });
  }

  delete(entity: T): Promise<void> {
    if (!entity._id) throw new Error(`delete need _id key`);
    return new Promise<void>((resolve, reject) => {
      this.db.remove({_id: entity._id}, {}, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

}
