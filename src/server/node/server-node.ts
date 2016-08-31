import {BaseNode} from "./base-node";
import {BoardNode} from "./board-node";
import {NotifierNode} from "./notifier/notifier-node";
import {NotifierGeneratorNode} from "./notifier/notifier-generator-node";
import {JobNode} from "./job-node";
import {tableRegistry} from "../table/table-registry";
import {ServerEntity} from "../../common/entity/server-entity";
import {BaseNotifierEntity} from "../../common/entity/notifier/base-notifier-entity";

export class ServerNode extends BaseNode<ServerEntity> {

  static EntityClass= ServerEntity;

  boards:{[name:string]:BoardNode};
  notifiers:{[name:string]:NotifierNode<BaseNotifierEntity>};
  jobs:{[name:string]:JobNode};

  static generate():Promise<ServerNode> {
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
      let node = new ServerNode(null, entity);
      return node.initialize();
    });
  }

  initialize():Promise<ServerNode> {
    return Promise.resolve().then(() => {
      return this.initializeChildren("boards", BoardNode);
    }).then(() => {
      return this.initializeChildrenWithGenerator("notifiers", NotifierGeneratorNode);
    }).then(() => {
      return this.initializeChildren("jobs", JobNode);
    }).then(() => {
      return this;
    });
  }

}
