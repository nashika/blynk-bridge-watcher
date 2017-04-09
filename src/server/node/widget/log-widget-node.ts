import util = require("util");

import _ = require("lodash");
import {injectable} from "inversify";

import {BaseWidgetNode} from "./base-widget-node";
import {LogWidgetNodeEntity} from "../../../common/entity/node/widget/log-widget-node-entity";
import {NodeServerService} from "../../service/node-server-service";

@injectable()
export class LogWidgetNode extends BaseWidgetNode<LogWidgetNodeEntity> {

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  protected async initialize(): Promise<void> {
    _.defaults(this.entity, {level: "info"});
    await super.initialize();
  }

  async run(...args: string[]): Promise<void> {
    await super.run();
    this.parent.log(this.entity.level, util.format(this.entity.message, ...args));
  };

}
