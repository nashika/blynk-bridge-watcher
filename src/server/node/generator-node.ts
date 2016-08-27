import {BaseNode} from  "./base-node";

export class GeneratorNode extends BaseNode {

  TYPE_TO_CLASS:{[type:string]:any} = {};

  constructor(parent:BaseNode) {
    super(parent, {_id: null, name: "generator"});
  }

  generate(parent:BaseNode, config:Object) {
    let type = this._checkConfig(config, "type", "string");
    if (this.TYPE_TO_CLASS[type])
      return new this.TYPE_TO_CLASS[type](parent, config);
    else {
      this.log("fatal", `Generator type='${type}' is not defined.`);
      process.exit(1);
    }
  }

}
