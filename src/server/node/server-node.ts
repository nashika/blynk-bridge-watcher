import {BaseNode} from "./base-node";
import {BoardNode} from "./board-node";
import {NotifierNode} from "./notifier/notifier-node";
import {NotifierGeneratorNode} from "./notifier/notifier-generator-node";
import {JobNode} from "./job-node";
import {tableRegistry} from "../table/table-registry";
import {ServerEntity} from "../../common/entity/server-entity";

export class ServerNode extends BaseNode {

  boards:{[name:string]:BoardNode};
  notifiers:{[name:string]:NotifierNode};
  jobs:{[name:string]:JobNode};

  constructor() {
    super(null);

    //this._initializeChildren(config, "boards", BoardNode);
    //this._initializeChildrenWithGenerator(config, "notifiers", NotifierGeneratorNode);
    //this._initializeChildren(config, "jobs", JobNode);
  }

  initialize():Promise<void> {
    return tableRegistry.server.findOne().then(serverEntity => {
      if (serverEntity) {
        this.entity = serverEntity;
      } else {
        this.entity = new ServerEntity({name: "SV01"});
        return tableRegistry.server.upsert(this.entity);
      }
    })
  }

}
