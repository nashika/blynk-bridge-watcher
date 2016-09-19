export interface ISocketIoData {
  _id: string;
}

export type TSocketIoLogLevel = "none" | "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export interface ISocketIoLogData extends ISocketIoData {
  level: TSocketIoLogLevel;
  message: string;
  timestamp: string;
}

export interface ISocketIoCountLogData extends ISocketIoData {
  count: number;
}

export type TSocketIoStatus = "connecting" | "processing" | "ready" | "stop" | "error";

export interface ISocketIoStatusData extends ISocketIoData {
  status: TSocketIoStatus;
}

export interface ISocketIoSendData extends ISocketIoData {
  args: any[];
}

export interface ISocketIoRequestLogsData extends ISocketIoData {
  page: number;
  limit: number;
}

export interface ISocketIoResponseLogsData extends ISocketIoData {
  logs: ISocketIoLogData[];
}
