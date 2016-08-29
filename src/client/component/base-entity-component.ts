import _ = require("lodash");

import {BaseComponent} from "./base-component";
import {serviceRegistry} from "../service/service-registry";
import {BaseEntity} from "../../common/entity/base-entity";

export class BaseEntityComponent<T extends BaseEntity> extends BaseComponent {

  EntityClass:typeof BaseEntity;
  $parent: BaseEntityComponent<BaseEntity>;
  entity: T;
  add: boolean;

  showModal: boolean;
  editEntity: T;

  get parentEntityComponent():BaseEntityComponent<BaseEntity> {
    return this.$parent;
  }

  data(): any {
    return {
      showModal: false,
      editEntity: null,
    };
  }

  onReady() {
    if (this.add) this.editEntity = <T>this.EntityClass.generateDefault();
    else this.editEntity = _.cloneDeep(this.entity);
    if (!this.add) this.reload();
  }

  reload() {
    _.forIn(this.EntityClass.params.children, (EntityClass:typeof BaseEntity, key:string) => {
      _.set(this, key, null);
      serviceRegistry.entity.getChildren(EntityClass, this.entity._id).then(entities => {
        _.set(this, key, entities);
      });
    });
  }

  edit() {
    this.showModal = false;
    if (this.add) {
      this.editEntity._parent = this.parentEntityComponent.entity._id;
      serviceRegistry.entity.add(this.editEntity).then(entity => {
        this.editEntity = <T>this.EntityClass.generateDefault();
        this.parentEntityComponent.reload();
      });
    } else {
      serviceRegistry.entity.edit(this.editEntity).then(entity => {
        this.parentEntityComponent.reload();
      });
    }
  }

  delete() {
    if (!confirm(`Are you sure you want to delete ${this.entity.Class.modelName} name:${this.entity.name}?`)) return;
    serviceRegistry.entity.delete(this.entity).then(entity => {
      this.parentEntityComponent.reload();
    });
  }

}
