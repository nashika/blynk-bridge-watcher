import path = require("path");

import NeDBDataStore = require("nedb");
import {getLogger} from "log4js";
import {injectable} from "inversify";

import {BaseServerService} from "./base-server-service";
import {ISocketIoFindQuery} from "../../common/util/socket-io-util";
import {BaseEntity} from "../../common/entity/base-entity";

let logger = getLogger("system");

@injectable()
export class TableServerService extends BaseServerService {

  private dataStores: {[tableName: string]: NeDBDataStore};

  constructor() {
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

  async find(tableName: string, query: ISocketIoFindQuery = {}): Promise<Object[]> {
    logger.trace(`Find ${tableName} table, query="${JSON.stringify(query)}".`);
    return await new Promise<Object[]>((resolve, reject) => {
      this.getDataStore(tableName).find<Object>(query).sort({_orderNo: 1}).exec((err, datas) => {
        if (err) return reject(err);
        resolve(datas);
      });
    });
  }

  async findOne(tableName: string, query: ISocketIoFindQuery = {}): Promise<Object> {
    return await new Promise<Object>((resolve, reject) => {
      this.getDataStore(tableName).find<Object>(query).limit(1).exec((err, datas) => {
        if (err) return reject(err);
        resolve(datas[0] || null);
      });
    });
  }

  async insert(tableName: string, data: BaseEntity): Promise<Object> {
    logger.trace(`Insert ${tableName} table, data="${JSON.stringify(data)}".`);
    return await new Promise<Object>((resolve, reject) => {
      this.getDataStore(tableName).insert(data, (err, newData) => {
        if (err) return reject(err);
        resolve(newData)
      });
    });
  }

  async update(tableName: string, data: BaseEntity): Promise<Object> {
    if (!data._id) throw new Error(`update need _id key`);
    logger.trace(`Update ${tableName} table, entity="${JSON.stringify(data)}".`);
    return await new Promise<Object>((resolve, reject) => {
      this.getDataStore(tableName).update({_id: data._id}, data, {returnUpdatedDocs: true}, err => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  async remove(tableName: string, id: string): Promise<void> {
    if (!id) throw new Error(`remove need _id key`);
    logger.trace(`Remove ${tableName} table, _id="${id}".`);
    await new Promise<void>((resolve, reject) => {
      this.getDataStore(tableName).remove({_id: id}, {}, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

}
