import {injectable} from "inversify";

import {BaseServerService} from "./base-server-service";
import {TableService} from "./table-service";
import {ServerNode} from "../node/server-node";
import {ServerEntity} from "../../common/entity/server-entity";
import {BaseNode} from "../node/base-node";
import {BaseEntity} from "../../common/entity/base-entity";
import {svKernel} from "../inversify.config";

@injectable()
export class NodeService extends BaseServerService {

  constructor(protected tableService: TableService) {
    super();
  }

  start(): Promise<ServerNode> {
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
      return node;
    });
  }

  generate(parent: BaseNode<BaseEntity>, entity: BaseEntity): Promise<BaseNode<BaseEntity>> {
    let result: BaseNode<BaseEntity> = svKernel.getNamed(BaseNode, entity.Class.params.entityName);
    result.entity = entity;
    result.parent = parent;
    result.log("trace", `Generate ${result.Class.name} object was started.`);
    result.status = "processing";
    return Promise.resolve().then(() => {
      return result.initialize();
    }).then(() => {
      result.log("trace", `Generate ${result.Class.name} object was finished.`);
      return result;
    });
  }

}
