import path = require("path");

import NeDBDataStore = require("nedb");
import {getLogger} from "log4js";
import {injectable, inject} from "inversify";

import {BaseServerService} from "./base-server-service";
import {BaseNodeEntity} from "../../common/entity/node/base-node-entity";
import {ISocketIoFindQuery} from "../../common/util/socket-io-util";

let logger = getLogger("system");
let tableName = "nodes";

@injectable()
export class TableServerService extends BaseServerService {

  private dataStores: {[tableName: string]: NeDBDataStore};

  constructor(@inject("Factory<BaseNodeEntity>") protected nodeEntityFactory: (data: any) => BaseNodeEntity) {
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

  async find<T extends BaseNodeEntity>(query: ISocketIoFindQuery = {}): Promise<T[]> {
    logger.trace(`Find ${tableName} table, query="${JSON.stringify(query)}".`);
    return await new Promise<T[]>((resolve, reject) => {
      this.getDataStore(tableName).find<T>(query).sort({_orderNo: 1}).exec((err, docs) => {
        if (err) return reject(err);
        let entities: T[] = docs.map(doc => <T>this.nodeEntityFactory(doc));
        resolve(entities);
      });
    });
  }

  async findOne<T extends BaseNodeEntity>(query: ISocketIoFindQuery = {}): Promise<T> {
    return await new Promise<T>((resolve, reject) => {
      this.getDataStore(tableName).find<T>(query).limit(1).exec((err, docs) => {
        if (err) return reject(err);
        let entity: T = docs[0] ? <T>this.nodeEntityFactory(docs[0]) : null;
        resolve(entity);
      });
    });
  }

  async findById<T extends BaseNodeEntity>(id: string): Promise<T> {
    return await this.findOne<T>({_id: id});
  }

  async insert<T extends BaseNodeEntity>(entity: T): Promise<T> {
    logger.trace(`Insert ${tableName} table, entity="${JSON.stringify(entity)}".`);
    return await new Promise<T>((resolve, reject) => {
      this.getDataStore(tableName).insert(entity, (err, newDoc) => {
        if (err) return reject(err);
        let entity: T = <T>this.nodeEntityFactory(newDoc);
        resolve(entity);
      });
    });
  }

  async update<T extends BaseNodeEntity>(entity: T): Promise<T> {
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
    if (!entity._id) throw new Error(`remove need _id key`);
    logger.trace(`Remove ${tableName} table, entity="${JSON.stringify(entity)}".`);
    await new Promise<void>((resolve, reject) => {
      this.getDataStore(tableName).remove({_id: entity._id}, {}, err => {
        if (err) return reject(err);
        resolve();
      });
    });
    let childEntities = await this.find({_parent: entity._id});
    for (let childEntity of childEntities) {
      await this.remove(childEntity);
    }
  }

}
