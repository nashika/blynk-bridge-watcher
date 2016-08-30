import {BaseNode} from  "./base-node";
import {BaseEntity} from "../../common/entity/base-entity";
import {BaseSwitchEntity} from "../../common/entity/base-switch-entity";

export class GeneratorNode<T extends BaseSwitchEntity> extends BaseNode<T> {

  TYPE_TO_CLASS:{[type:string]:any} = {};

  constructor(parent:BaseNode<BaseEntity>) {
    super(parent, <any>{_id: null, _parent:parent.entity._id, name: "generator"});
  }

  generate(parent:BaseNode<BaseEntity>, entity:BaseSwitchEntity) {
    if (this.TYPE_TO_CLASS[entity.type])
      return new this.TYPE_TO_CLASS[entity.type](parent, entity);
    else {
      this.log("fatal", `Generator type='${entity.type}' is not defined.`);
      process.exit(1);
    }
  }

}
