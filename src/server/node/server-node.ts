import {BaseNode} from "./base-node";
import {BoardNode} from "./board-node";
import {NotifierNode} from "./notifier/notifier-node";
import {JobNode} from "./job-node";
import {ServerEntity} from "../../common/entity/server-entity";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";
import {serverServiceRegistry} from "../service/server-service-registry";

export class ServerNode extends BaseNode<ServerEntity> {

  static EntityClass = ServerEntity;

  boards: BoardNode[];
  notifiers: NotifierNode<BaseNotifierEntity>[];
  jobs: JobNode[];

  initialize(): Promise<void> {
    return super.initialize().then(() => {
      this.status = "ready";
    });
  }

  static start(): Promise<ServerNode> {
    return Promise.resolve().then(() => {
      return serverServiceRegistry.table.findOne(ServerEntity);
    }).then(serverEntity => {
      if (serverEntity) {
        return serverEntity;
      } else {
        let entity = ServerEntity.generateDefault();
        return serverServiceRegistry.table.insert(entity);
      }
    }).then(entity => {
      return this.generate(null, entity);
    }).then(node => {
      return node;
    });
  }

}
