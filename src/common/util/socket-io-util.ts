import {BaseEntity} from "../entity/base-entity";

export interface ISocketIoData {
  _id: string;
}

export interface ISocketIoEntityData extends ISocketIoData {
  tableName: string;
  entity: BaseEntity;
}

export type TSocketIoLogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export interface ISocketIoLogData extends ISocketIoData {
  level: TSocketIoLogLevel;
  message: string;
  timestamp: string;
}

export type TSocketIoStatus = "connecting" | "processing" | "ready" | "stop" | "error";

export interface ISocketIoStatusData extends ISocketIoData {
  status: TSocketIoStatus;
}
