import {injectable} from "inversify";

import {BaseWidgetNode} from "./base-widget-node";
import {IfWidgetNodeEntity} from "../../../common/entity/node/widget/if-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";
import {INodeEntityNextNode} from "../../../common/entity/node/base-node-entity";

@injectable()
export class IfWidgetNode extends BaseWidgetNode<IfWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  async run(...args: string[]): Promise<void> {
    await super.run();
    if (args.length < 1)
      return this.log("warn", `If widget called no argument.`);
    let result = false;
    if (args[0] == "if") {
      result = true;
    } else if (args[0] == "else") {
      result = false;
    } else {
      let arg = parseInt(args[0]);
      if (isNaN(arg))
        return this.log("warn", `If widget called not integer argument. arg='${args[0]}'`);
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
      this.log("debug", `If widget. '(${arg} ${this.entity.operator} ${this.entity.value}) = ${result}'`);
    }
    let nextNodes: INodeEntityNextNode[] = result ? (this.entity.then || []) : (this.entity.else || []);
    await this.runNextNodes(nextNodes, ...args);
  }

}
