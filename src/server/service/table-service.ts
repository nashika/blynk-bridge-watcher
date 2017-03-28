import path = require("path");

import NeDBDataStore = require("nedb");
import {getLogger} from "log4js";
import {injectable, inject} from "inversify";
import * as _ from "lodash";

import {BaseServerService} from "./base-server-service";
import {BaseNodeEntity} from "../../common/entity/node/base-node-entity";

let logger = getLogger("system");

@injectable()
export class TableService extends BaseServerService {

  private dataStores: {[tableName: string]: NeDBDataStore};

  constructor(@inject("Factory<BaseNodeEntity>") protected entityFactory: (tableName: string, data: any) => BaseNodeEntity) {
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

  async find<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, query: any = {}): Promise<T[]> {
    let tableName = EntityClass.params.tableName;
    logger.trace(`Find ${tableName} table, query="${JSON.stringify(query)}".`);
    return await new Promise<T[]>((resolve, reject) => {
      this.getDataStore(tableName).find<T>(query).sort({_orderNo: 1}).exec((err, docs) => {
        if (err) return reject(err);
        let entities: T[] = docs.map(doc => <T>this.entityFactory(tableName, doc));
        resolve(entities);
      });
    });
  }

  async findOne<T extends BaseNodeEntity>(EntityClass: typeof BaseNodeEntity, id: string = ""): Promise<T> {
    let tableName = EntityClass.params.tableName;
    logger.trace(`Find ${tableName} table, id="${id}".`);
    return await new Promise<T>((resolve, reject) => {
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

  async insert<T extends BaseNodeEntity>(entity: T): Promise<T> {
    let tableName = entity.Class.params.tableName;
    logger.trace(`Insert ${tableName} table, entity="${JSON.stringify(entity)}".`);
    return await new Promise<T>((resolve, reject) => {
      this.getDataStore(tableName).insert(entity, (err, newDoc) => {
        if (err) return reject(err);
        let entity: T = <T>this.entityFactory(tableName, newDoc);
        resolve(entity);
      });
    });
  }

  async update<T extends BaseNodeEntity>(entity: T): Promise<T> {
    let tableName = entity.Class.params.tableName;
    if (!entity._id) throw new Error(`update need _id key`);
    logger.trace(`Update ${tableName} table, entity="${JSON.stringify(entity)}".`);
    return await new Promise<T>((resolve, reject) => {
      this.getDataStore(tableName).update({_id: entity._id}, entity, {returnUpdatedDocs: true}, err => {
        if (err) return reject(err);
        resolve(entity);
      });
    });
  }

  async remove<T extends BaseNodeEntity>(entity: T): Promise<void> {
    let tableName = entity.Class.params.tableName;
    if (!entity._id) throw new Error(`remove need _id key`);
    logger.trace(`Remove ${tableName} table, entity="${JSON.stringify(entity)}".`);
    await new Promise<void>((resolve, reject) => {
      this.getDataStore(tableName).remove({_id: entity._id}, {}, err => {
        if (err) return reject(err);
        resolve();
      });
    });
    for (let ChildEntityClass of _.values<typeof BaseNodeEntity>(entity.Class.params.children)) {
      let childEntities = await this.find(ChildEntityClass, {_parent: entity._id});
      for (let childEntity of childEntities) {
        await this.remove(childEntity);
      }
    }
  }

}
