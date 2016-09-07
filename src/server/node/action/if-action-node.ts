import {ActionNode} from "./action-node";
import {IfActionEntity} from "../../../common/entity/action/if-action-entity";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {socketIoServer} from "../../socket-io";

export class IfActionNode extends ActionNode<IfActionEntity> {

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
    let action: ActionNode<BaseActionEntity>;
    if (result && this.entity.then)
      action = <ActionNode<BaseActionEntity>>socketIoServer.getNode(this.entity.then);
    else if (!result && this.entity.else)
      action = <ActionNode<BaseActionEntity>>socketIoServer.getNode(this.entity.else);
    if (action)
      action.run(...args);
  };

}
