import {BaseNode} from "../base-node";
import {BridgeNode} from "../bridge/bridge-node";
import {ActionGeneratorNode} from "./action-generator-node";

export class ActionNode extends BaseNode {

  parent:BridgeNode;
  aliases:string[];

  constructor(parent:BridgeNode, config:Object) {
    super(parent, config);
    this.aliases = this._checkConfig(config, "aliases", "array", []);
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
