import {Base} from  "./base";

export class Generator extends Base {

  TYPE_TO_CLASS:{[type:string]:any} = {};

  constructor(parent:Base) {
    super(parent, {name: "generator"});
  }

  generate(parent:Base, config:Object) {
    let type = this._checkConfig(config, "type", "string");
    if (this.TYPE_TO_CLASS[type])
      return new this.TYPE_TO_CLASS[type](parent, config);
    else {
      this.log("fatal", `Generator type='${type}' is not defined.`);
      process.exit(1);
    }
  }

}
