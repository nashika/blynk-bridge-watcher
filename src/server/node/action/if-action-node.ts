import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {IfActionEntity} from "../../../common/entity/action/if-action-entity";

export class IfActionNode extends ActionNode<IfActionEntity> {

  run = (bridge: BridgeNode, ...args: string[]) => {
    if (args.length < 1)
      return this.log("warn", `If action called no argument.`);
    let arg = parseInt(args[0]);
    if (isNaN(arg))
      return this.log("warn", `If action called not integer argument. arg='${args[0]}'`);
    let result = false;
    switch (this.entity.operator) {
      case "=":
      case "==":
        result = arg == this.entity.value;
        break;
      case "<":
        result = arg < this.entity.value;
        break;
      case ">":
        result = arg > this.entity.value;
        break;
      case "<=":
        result = arg <= this.entity.value;
        break;
      case ">=":
        result = arg >= this.entity.value;
        break;
      case "!=":
      case "<>":
        result = arg != this.entity.value;
        break;
      default:
        return this.log("warn", `Operator '${this.entity.operator}' is invalid.`);
    }
    this.log("debug", `If action. '(${arg} ${this.entity.operator} ${this.entity.value}) = ${result}'`);
    if (result && this.entity.then)
      bridge.emit(this.entity.then, bridge, ...args);
    else if (!result && this.entity.else)
      bridge.emit(this.entity.else, bridge, ...args);
  };

}
