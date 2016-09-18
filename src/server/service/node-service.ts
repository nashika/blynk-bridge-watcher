import {injectable} from "inversify";

import {BaseServerService} from "./base-server-service";
import {TableService} from "./table-service";
import {ServerNode} from "../node/server-node";
import {ServerEntity} from "../../common/entity/server-entity";

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
      return ServerNode.generate(null, entity);
    }).then(node => {
      return node;
    });
  }

}
