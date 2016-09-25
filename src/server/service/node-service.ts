import {injectable} from "inversify";
import _ = require("lodash");

import {BaseServerService} from "./base-server-service";
import {TableService} from "./table-service";
import {ServerNode} from "../node/server-node";
import {ServerEntity} from "../../common/entity/server-entity";
import {BaseNode} from "../node/base-node";
import {BaseEntity} from "../../common/entity/base-entity";
import {kernel} from "../../common/inversify.config";

@injectable()
export class NodeService extends BaseServerService {

  private nodes: {[_id: string]: BaseNode<BaseEntity>};

  constructor(protected tableService: TableService) {
    super();
    this.nodes = {};
  }

  initialize(): Promise<ServerNode> {
    let serverNode: ServerNode;
    return Promise.resolve().then(() => {
      return this.tableService.findOne(ServerEntity);
    }).then(serverEntity => {
      if (serverEntity) {
        return serverEntity;
      } else {
        let entity = ServerEntity.generateDefault();
        return this.tableService.insert(entity);
      }
    }).then(entity => {
      return this.generate(null, entity);
    }).then(node => {
      serverNode = <ServerNode>node;
      return serverNode.startWrap();
    }).then(() => {
      return serverNode;
    });
  }

  generate(parent: BaseNode<BaseEntity>, entity: BaseEntity): Promise<BaseNode<BaseEntity>> {
    let result: BaseNode<BaseEntity> = kernel.getNamed(BaseNode, entity.Class.params.entityName);
    result.entity = entity;
    result.parent = parent;
    result.log("debug", `Generate ${result.constructor.name} object was started.`);
    result.status = "processing";
    return result.initializeWrap().then(() => {
      result.log("debug", `Generate ${result.constructor.name} object was finished.`);
      return result;
    });
  }

  registerNode(node: BaseNode<BaseEntity>): void {
    this.nodes[node.entity._id] = node;
  }

  unregisterNode(_id: string): void {
    delete this.nodes[_id];
  }

  getNode(id: string): BaseNode<BaseEntity> {
    return _.find(this.nodes, (node: BaseNode<BaseEntity>, _id: string) => _.startsWith(_id, id));
  }

  getNodes(filter: string): BaseNode<BaseEntity>[] {
    return _.filter(this.nodes, node => !filter || filter == node.EntityClass.params.tableName);
  }

}
