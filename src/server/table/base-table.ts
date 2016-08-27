import NeDBDataStore = require("nedb");
import {BaseEntity} from "../../common/entity/base-entity";

export abstract class BaseTable<T> {

  NAME:string;
  db:NeDBDataStore;

  constructor() {
    this.db = new NeDBDataStore({
      filename: `../../../db/${this.NAME}.db`,
      autoload: true,
    });
  }

  findAll():Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this.db.find<T>({}, (err, docs) => {
        if (err) return reject(err);
        resolve(docs);
      });
    });
  }

  findOne(id:string = ""):Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (id) {
        this.db.findOne<T>({_id: id}, (err, doc) => {
          if (err) return reject(err);
          resolve(doc);
        });
      } else {
        this.db.find<T>({}).limit(1).exec((err, docs) => {
          if (err) return reject(err);
          resolve(docs[0] ? docs[0] : null);
        });
      }
    });
  }

  upsert(entity:BaseEntity):Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.update(entity, {}, {upsert: true}, (err) => {
        if (err) return reject(err);
        resolve();
      })
    });
  }

}
