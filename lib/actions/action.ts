import {Base} from "../base";
import {Bridge} from "../bridges/bridge";
import {ActionGenerator} from "./action-generator";

export class Action extends Base {

  parent:Bridge;
  aliases:string[];

  constructor(parent:Bridge, config:Object) {
    super(parent, config);
    this.aliases = this._checkConfig(config, "aliases", "array", []);
  }

  run = (caller:Base, ...args:string[]) => {
    this.log("error", `Action.run is abstract function`);
  };

  protected _addSubAction = (parent:Bridge, config:Object, key:string) => {
    let subActionConfig = this._checkConfig(config, key, ["string", "object"], "");
    if (subActionConfig == "" || typeof subActionConfig == "string")
      return subActionConfig;
    else {
      let name = this.name + "$" + key;
      subActionConfig.name = name;
      let generator = new ActionGenerator(parent);
      parent.actions[name] = generator.generate(parent, subActionConfig);
      return name;
    }
  };

}
