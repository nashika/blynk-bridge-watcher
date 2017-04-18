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

  async run(param: string): Promise<void> {
    await super.run();
    if (!param)
      return this.log("warn", `If widget called no argument.`);
    let result = false;
    if (param == "if") {
      result = true;
    } else if (param == "else") {
      result = false;
    } else {
      let intParam = parseInt(param);
      if (isNaN(intParam))
        return this.log("warn", `If widget called not integer argument. arg='${param}'`);
      switch (this.entity.operator) {
        case "$eq":
          result = intParam == this.entity.value;
          break;
        case "$lt":
          result = intParam < this.entity.value;
          break;
        case "$gt":
          result = intParam > this.entity.value;
          break;
        case "$lte":
          result = intParam <= this.entity.value;
          break;
        case "$gte":
          result = intParam >= this.entity.value;
          break;
        case "$ne":
          result = intParam != this.entity.value;
          break;
        default:
          return this.log("warn", `Operator '${this.entity.operator}' is invalid.`);
      }
      this.log("debug", `If widget. '(${intParam} ${this.entity.operator} ${this.entity.value}) = ${result}'`);
    }
    let nextNodes: INodeEntityNextNode[] = result ? (this.entity.then || []) : (this.entity.else || []);
    await this.runNextNodes(nextNodes);
  }

}
