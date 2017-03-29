import {injectable} from "inversify";

import {BaseNode} from "./base-node";
import {BoardNode} from "./board-node";
import {NotifierNode} from "./notifier/notifier-node";
import {JobNode} from "./job-node";
import {ServerNodeEntity} from "../../common/entity/node/server-node-entity";
import {BaseNotifierNodeEntity} from "../../common/entity/node/notifier/base-notifier-node-entity";
import {NodeServerService} from "../service/node-server-service";

@injectable()
export class ServerNode extends BaseNode<ServerNodeEntity> {

  boards: BoardNode[];
  notifiers: NotifierNode<BaseNotifierNodeEntity>[];
  jobs: JobNode[];

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async initialize(): Promise<void> {
    await super.initialize();
  }

  async start(): Promise<void> {
    await super.start();
    this.status = "ready";
  }

}
