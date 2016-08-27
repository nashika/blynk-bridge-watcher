import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {ActionGeneratorNode} from "./action-generator-node";
import {ActionEntity} from "../../../common/entity/action-entity";

export class ActionNode extends BaseNode {

  static modelName = "action";

  parent:BridgeNode;
  aliases:string[];

  constructor(parent:BridgeNode, entity:ActionEntity) {
    super(parent, entity);
    this.aliases = this._checkConfig(entity, "aliases", "array", []);
  }

  run = (caller:BaseNode, ...args:string[]) => {
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
