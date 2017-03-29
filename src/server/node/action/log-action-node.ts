import util = require("util");

import _ = require("lodash");
import {injectable} from "inversify";

import {ActionNode} from "./action-node";
import {LogActionNodeEntity} from "../../../common/entity/node/action/log-action-node-entity";
import {TableServerService} from "../../service/table-server-service";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class LogActionNode extends ActionNode<LogActionNodeEntity> {

  constructor(protected tableServerService: TableServerService,
              protected nodeServerService: NodeServerService) {
    super(tableServerService, nodeServerService);
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
