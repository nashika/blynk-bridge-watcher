import _ = require("lodash");

import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {ActionGeneratorNode} from "./action-generator-node";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {BaseEntity} from "../../../common/entity/base-entity";

export class ActionNode<T extends BaseActionEntity> extends BaseNode<T> {

  static EntityClass = BaseActionEntity;

  parent:BridgeNode;

  constructor(parent:BridgeNode, entity:T) {
    super(parent, entity);
    _.defaults(entity, {aliases: []});
  }

  run = (caller:BaseNode<BaseEntity>, ...args:string[]) => {
    this.log("error", `Action.run is abstract function`);
  };

  protected _addSubAction = (parent:BridgeNode, entity:BaseActionEntity, key:string) => {
    let subActionConfig:any = _.get(entity, key);
    if (!subActionConfig || typeof subActionConfig == "string")
      return subActionConfig;
    else {
      let name = this.name + "$" + key;
      subActionConfig.name = name;
      let generator = new ActionGeneratorNode(parent);
      parent.actions[name] = generator.generate(parent, subActionConfig);
      return name;
    }
  };

}
