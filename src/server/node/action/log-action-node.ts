import util = require("util");

import _ = require("lodash");

import {ActionNode} from "./action-node";
import {LogActionEntity} from "../../../common/entity/action/log-action-entity";
import {TableService} from "../../service/table-service";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {NodeService} from "../../service/node-service";

export class LogActionNode extends ActionNode<LogActionEntity> {

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
  }


  initialize(): Promise<void> {
    _.defaults(this.entity, {level: "info"});
    return super.initialize();
  }

  run(...args: string[]) {
    super.run();
    this.parent.log(this.entity.level, util.format(this.entity.message, ...args));
  };

}
