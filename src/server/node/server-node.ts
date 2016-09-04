import {BaseNode} from "./base-node";
import {BoardNode} from "./board-node";
import {NotifierNode} from "./notifier/notifier-node";
import {JobNode} from "./job-node";
import {tableRegistry} from "../table/table-registry";
import {ServerEntity} from "../../common/entity/server-entity";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";

export class ServerNode extends BaseNode<ServerEntity> {

  static EntityClass = ServerEntity;

  boards: {[name: string]: BoardNode};
  notifiers: {[name: string]: NotifierNode<BaseNotifierEntity>};
  jobs: {[name: string]: JobNode};

  initialize(): Promise<void> {
    return super.initialize().then(() => {
      this.status = "ready";
    });
  }

  static start(): Promise<ServerNode> {
    return Promise.resolve().then(() => {
      return tableRegistry.server.findOne();
    }).then(serverEntity => {
      if (serverEntity) {
        return serverEntity;
      } else {
        let entity = ServerEntity.generateDefault();
        return tableRegistry.server.insert(entity);
      }
    }).then(entity => {
      return this.generate(null, entity);
    }).then(node => {
      return node;
    });
  }

}
