import {BaseNode} from "./base-node";
import {BoardNode} from "./board-node";
import {NotifierNode} from "./notifier/notifier-node";
import {NotifierGeneratorNode} from "./notifier/notifier-generator-node";
import {JobNode} from "./job-node";
import {tableRegistry} from "../table/table-registry";
import {ServerEntity} from "../../common/entity/server-entity";

export class ServerNode extends BaseNode {

  static modelName = "server";

  boards:{[name:string]:BoardNode};
  notifiers:{[name:string]:NotifierNode};
  jobs:{[name:string]:JobNode};

  constructor(entity:ServerEntity) {
    super(null, entity);
  }

  static generate():Promise<ServerNode> {
    let result:ServerNode;
    return tableRegistry.server.findOne().then(serverEntity => {
      if (serverEntity) {
        return serverEntity;
      } else {
        let entity = new ServerEntity({name: "SV01"});
        return tableRegistry.server.insert(entity);
      }
    }).then((entity:ServerEntity) => {
      result = new ServerNode(entity);
      return result.initialize();
    }).then(() => {
      return result;
    });
  }

  initialize():Promise<void> {
    return Promise.resolve().then(() => {
      return this.initializeChildren("boards", BoardNode);
    }).then(() => {
      return this.initializeChildrenWithGenerator("notifiers", NotifierGeneratorNode);
    }).then(() => {
      return this.initializeChildren("jobs", JobNode);
    });
  }

}
