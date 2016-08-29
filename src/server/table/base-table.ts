import path = require("path");

import NeDBDataStore = require("nedb");
import {getLogger} from "log4js";

import {BaseEntity} from "../../common/entity/base-entity";
import {MyPromise} from "../../common/util/my-promise";
import {tableRegistry} from "./table-registry";

let logger = getLogger("system");

export class BaseTable<T extends BaseEntity> {

  static EntityClass: typeof BaseEntity;

  db: NeDBDataStore;

  constructor() {
    this.db = new NeDBDataStore({
      filename: path.join(__dirname, `../../../db/${this.Class.EntityClass.modelName}.db`),
      autoload: true,
    });
  }

  get Class(): typeof BaseTable {
    return <typeof BaseTable>this.constructor;
  }

  find(query: any = {}): Promise<T[]> {
    logger.trace(`Find ${this.Class.EntityClass.modelName} table, query="${JSON.stringify(query)}".`);
    return new Promise<T[]>((resolve, reject) => {
      this.db.find<T>(query, (err, docs) => {
        if (err) return reject(err);
        let entities: T[] = docs.map(doc => <T>new this.Class.EntityClass(doc));
        resolve(entities);
      });
    });
  }

  findOne(id: string = ""): Promise<T> {
    logger.trace(`Find ${this.Class.EntityClass.modelName} table, id="${id}".`);
    return new Promise<T>((resolve, reject) => {
      if (id) {
        this.db.findOne<T>({_id: id}, (err, doc) => {
          if (err) return reject(err);
          let entity: T = <T>new this.Class.EntityClass(doc);
          resolve(entity);
        });
      } else {
        this.db.find<T>({}).limit(1).exec((err, docs) => {
          if (err) return reject(err);
          let entity: T = docs[0] ? <T>new this.Class.EntityClass(docs[0]) : null;
          resolve(entity);
        });
      }
    });
  }

  insert(entity: T): Promise<T> {
    logger.trace(`Insert ${this.Class.EntityClass.modelName} table, entity="${JSON.stringify(entity)}".`);
    return new Promise((resolve, reject) => {
      this.db.insert(entity, (err, newDoc) => {
        if (err) return reject(err);
        let entity: T = <T>new this.Class.EntityClass(newDoc);
        resolve(entity);
      });
    });
  }

  update(entity: T): Promise<T> {
    if (!entity._id) throw new Error(`update need _id key`);
    logger.trace(`Update ${this.Class.EntityClass.modelName} table, entity="${JSON.stringify(entity)}".`);
    return new Promise((resolve, reject) => {
      this.db.update({_id: entity._id}, entity, {returnUpdatedDocs: true}, err => {
        if (err) return reject(err);
        resolve(entity);
      });
    });
  }

  remove(entity: T): Promise<void> {
    if (!entity._id) throw new Error(`remove need _id key`);
    logger.trace(`Remove ${this.Class.EntityClass.modelName} table, entity="${JSON.stringify(entity)}".`);
    return new Promise<void>((resolve, reject) => {
      this.db.remove({_id: entity._id}, {}, err => {
        if (err) return reject(err);
        resolve();
      });
    }).then(() => {
      return MyPromise.eachPromiseSeries(entity.Class.params.children, (ChildEntityClass:typeof BaseEntity) => {
        let childTable = tableRegistry.getInstance(ChildEntityClass.modelName);
        return childTable.find({_parent: entity._id}).then(childEntities => {
          return MyPromise.eachPromiseSeries(childEntities, childEntity => {
            return childTable.remove(childEntity);
          });
        });
      });
    });
  }

}
