import path = require("path");

import NeDBDataStore = require("nedb");
import {getLogger} from "log4js";
import {injectable, inject} from "inversify";

import {BaseEntity} from "../../common/entity/base-entity";
import {MyPromise} from "../../common/util/my-promise";
import {BaseServerService} from "./base-server-service";

let logger = getLogger("system");

@injectable()
export class TableService extends BaseServerService {

  private dataStores: {[tableName: string]: NeDBDataStore};

  constructor(@inject("Factory<Entity>") protected entityFactory: (tableName: string, data: any) => BaseEntity) {
    super();
    this.dataStores = {};
  }

  private getDataStore(tableName: string): NeDBDataStore {
    if (!this.dataStores[tableName]) {
      this.dataStores[tableName] = new NeDBDataStore({
        filename: path.join(__dirname, `../../../db/${tableName}.db`),
        autoload: true,
      });
    }
    return this.dataStores[tableName];
  }

  find<T extends BaseEntity>(EntityClass: typeof BaseEntity, query: any = {}): Promise<T[]> {
    let tableName = EntityClass.params.tableName;
    logger.trace(`Find ${tableName} table, query="${JSON.stringify(query)}".`);
    return new Promise<T[]>((resolve, reject) => {
      this.getDataStore(tableName).find<T>(query).sort({_orderNo: 1}).exec((err, docs) => {
        if (err) return reject(err);
        let entities: T[] = docs.map(doc => <T>this.entityFactory(tableName, doc));
        resolve(entities);
      });
    });
  }

  findOne<T extends BaseEntity>(EntityClass: typeof BaseEntity, id: string = ""): Promise<T> {
    let tableName = EntityClass.params.tableName;
    logger.trace(`Find ${tableName} table, id="${id}".`);
    return new Promise<T>((resolve, reject) => {
      if (id) {
        this.getDataStore(tableName).findOne<T>({_id: id}, (err, doc) => {
          if (err) return reject(err);
          let entity: T = <T>this.entityFactory(tableName, doc);
          resolve(entity);
        });
      } else {
        this.getDataStore(tableName).find<T>({}).limit(1).exec((err, docs) => {
          if (err) return reject(err);
          let entity: T = docs[0] ? <T>this.entityFactory(tableName, docs[0]) : null;
          resolve(entity);
        });
      }
    });
  }

  insert<T extends BaseEntity>(entity: T): Promise<T> {
    let tableName = entity.Class.params.tableName;
    logger.trace(`Insert ${tableName} table, entity="${JSON.stringify(entity)}".`);
    return new Promise((resolve, reject) => {
      this.getDataStore(tableName).insert(entity, (err, newDoc) => {
        if (err) return reject(err);
        let entity: T = <T>this.entityFactory(tableName, newDoc);
        resolve(entity);
      });
    });
  }

  update<T extends BaseEntity>(entity: T): Promise<T> {
    let tableName = entity.Class.params.tableName;
    if (!entity._id) throw new Error(`update need _id key`);
    logger.trace(`Update ${tableName} table, entity="${JSON.stringify(entity)}".`);
    return new Promise((resolve, reject) => {
      this.getDataStore(tableName).update({_id: entity._id}, entity, {returnUpdatedDocs: true}, err => {
        if (err) return reject(err);
        resolve(entity);
      });
    });
  }

  remove<T extends BaseEntity>(entity: T): Promise<void> {
    let tableName = entity.Class.params.tableName;
    if (!entity._id) throw new Error(`remove need _id key`);
    logger.trace(`Remove ${tableName} table, entity="${JSON.stringify(entity)}".`);
    return new Promise<void>((resolve, reject) => {
      this.getDataStore(tableName).remove({_id: entity._id}, {}, err => {
        if (err) return reject(err);
        resolve();
      });
    }).then(() => {
      return MyPromise.eachPromiseSeries(entity.Class.params.children, (ChildEntityClass: typeof BaseEntity) => {
        return this.find(ChildEntityClass, {_parent: entity._id}).then(childEntities => {
          return MyPromise.eachPromiseSeries(childEntities, childEntity => {
            return this.remove(childEntity);
          });
        });
      });
    });
  }

}
