import {injectable} from "inversify";
import _ = require("lodash");

import {BaseServerService} from "./base-server-service";
import {TableService} from "./table-service";
import {ServerNode} from "../node/server-node";
import {ServerNodeEntity} from "../../common/entity/node/server-node-entity";
import {BaseNode} from "../node/base-node";
import {container} from "../../common/inversify.config";
import {BaseNodeEntity} from "../../common/entity/node/base-node-entity";

@injectable()
export class NodeService extends BaseServerService {

  private serverNode: ServerNode;
  private nodes: {[_id: string]: BaseNode<BaseNodeEntity>};

  constructor(protected tableService: TableService) {
    super();
    this.nodes = {};
  }

  async initialize(): Promise<void> {
    let serverEntity = await this.tableService.findOne({type: "server"});
    if (!serverEntity) {
      serverEntity = await this.tableService.insert(ServerNodeEntity.generateDefault());
    }
    this.serverNode = <ServerNode>await this.generate(null, serverEntity);
    await this.serverNode.startWrap();
  }

  async finalize(): Promise<void> {
    await this.serverNode.finalizeWrap();
    delete this.serverNode;
  }

  async generate(parent: BaseNode<BaseNodeEntity>, entity: BaseNodeEntity): Promise<BaseNode<BaseNodeEntity>> {
    let result: BaseNode<BaseNodeEntity> = container.getNamed(BaseNode, _.camelCase((entity.Class.params.subType ? entity.Class.params.subType + "_" : "") + entity.Class.params.type));
    result.entity = entity;
    result.parent = parent;
    result.log("debug", `Generate ${result.constructor.name} object was started.`);
    result.status = "processing";
    await result.initializeWrap();
    result.log("debug", `Generate ${result.constructor.name} object was finished.`);
    return result;
  }

  registerNode(node: BaseNode<BaseNodeEntity>): void {
    this.nodes[node.entity._id] = node;
  }

  unregisterNode(_id: string): void {
    delete this.nodes[_id];
  }

  getNodeById(id: string): BaseNode<BaseNodeEntity> {
    return _.find(this.nodes, (_node: BaseNode<BaseNodeEntity>, _id: string) => _.startsWith(_id, id));
  }

  getNodesByType(type: string = ""): BaseNode<BaseNodeEntity>[] {
    return _.filter(this.nodes, node => !type || type == node.EntityClass.params.type);
  }

}
