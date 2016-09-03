import {BaseEntity} from "../entity/base-entity";

export interface ISocketIoData {
  _id: string;
}

export interface ISocketIoEntityData extends ISocketIoData {
  tableName: string;
  entity: BaseEntity;
}

export interface ISocketIoLogData extends ISocketIoData {
  level: string;
  message: string;
}

export interface ISocketIoStatusData extends ISocketIoData {
  status: boolean;
}
