import {injectable} from "inversify";

import {ActionNode} from "./action-node";
import {IfActionNodeEntity} from "../../../common/entity/node/action/if-action-node-entity";
import {BaseActionNodeEntity} from "../../../common/entity/node/action/base-action-node-entity";
import {TableService} from "../../service/table-service";
import {SocketIoServerService} from "../../service/socket-io-server-service";
import {NodeService} from "../../service/node-service";

@injectable()
export class IfActionNode extends ActionNode<IfActionNodeEntity> {

  constructor(protected tableService: TableService,
              protected socketIoServerService: SocketIoServerService,
              protected nodeService: NodeService) {
    super(tableService, socketIoServerService, nodeService);
  }

  run(...args: string[]): void {
    super.run();
    if (args.length < 1)
      return this.log("warn", `If action called no argument.`);
    let result = false;
    if (args[0] == "if") {
      result = true;
    } else if (args[0] == "else") {
      result = false;
    } else {
      let arg = parseInt(args[0]);
      if (isNaN(arg))
        return this.log("warn", `If action called not integer argument. arg='${args[0]}'`);
      switch (this.entity.operator) {
        case "$eq":
          result = arg == this.entity.value;
          break;
        case "$lt":
          result = arg < this.entity.value;
          break;
        case "$gt":
          result = arg > this.entity.value;
          break;
        case "$lte":
          result = arg <= this.entity.value;
          break;
        case "$gte":
          result = arg >= this.entity.value;
          break;
        case "$ne":
          result = arg != this.entity.value;
          break;
        default:
          return this.log("warn", `Operator '${this.entity.operator}' is invalid.`);
      }
      this.log("debug", `If action. '(${arg} ${this.entity.operator} ${this.entity.value}) = ${result}'`);
    }
    let action: ActionNode<BaseActionNodeEntity>;
    if (result && this.entity.then)
      action = <ActionNode<BaseActionNodeEntity>>this.nodeService.getNodeById(this.entity.then);
    else if (!result && this.entity.else)
      action = <ActionNode<BaseActionNodeEntity>>this.nodeService.getNodeById(this.entity.else);
    if (action)
      action.run(...args);
  };

}
