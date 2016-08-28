import {BaseNode} from  "./base-node";
import {BaseEntity} from "../../common/entity/base-entity";

export class GeneratorNode<T extends BaseEntity> extends BaseNode<T> {

  TYPE_TO_CLASS:{[type:string]:any} = {};

  constructor(parent:BaseNode<BaseEntity>) {
    super(parent, <any>{_id: null, _parent:parent.entity._id, name: "generator"});
  }

  generate(parent:BaseNode<BaseEntity>, config:Object) {
    let type = this._checkConfig(config, "type", "string");
    if (this.TYPE_TO_CLASS[type])
      return new this.TYPE_TO_CLASS[type](parent, config);
    else {
      this.log("fatal", `Generator type='${type}' is not defined.`);
      process.exit(1);
    }
  }

}
