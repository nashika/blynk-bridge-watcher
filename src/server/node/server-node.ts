import {BaseNode} from "./base-node";
import {BoardNode} from "./board-node";
import {NotifierNode} from "./notifier/notifier-node";
import {NotifierGeneratorNode} from "./notifier/notifier-generator-node";
import {JobNode} from "./job-node";
import {tableRegistry} from "../table/table-registry";
import {ServerEntity} from "../../common/entity/server-entity";

export class ServerNode extends BaseNode {

  static modelName = "server";

  entity:ServerEntity;
  boards:{[name:string]:BoardNode};
  notifiers:{[name:string]:NotifierNode};
  jobs:{[name:string]:JobNode};

  initialize():Promise<void> {
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
      this.parent = null;
      this.entity = entity;
      return;
    }).then(() => {
      return this.initializeChildren("boards", BoardNode);
    }).then(() => {
      return this.initializeChildrenWithGenerator("notifiers", NotifierGeneratorNode);
    }).then(() => {
      return this.initializeChildren("jobs", JobNode);
    });
  }

}
