import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {ActionGeneratorNode} from "./action-generator-node";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";
import {BaseEntity} from "../../../common/entity/base-entity";

export class ActionNode extends BaseNode<BaseActionEntity> {

  static EntityClass = BaseActionEntity;

  parent:BridgeNode;
  aliases:string[];

  constructor(parent:BridgeNode, entity:BaseActionEntity) {
    super(parent, entity);
    this.aliases = this._checkConfig(entity, "aliases", "array", []);
  }

  run = (caller:BaseNode<BaseEntity>, ...args:string[]) => {
    this.log("error", `Action.run is abstract function`);
  };

  protected _addSubAction = (parent:BridgeNode, config:Object, key:string) => {
    let subActionConfig = this._checkConfig(config, key, ["string", "object"], "");
    if (subActionConfig == "" || typeof subActionConfig == "string")
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
