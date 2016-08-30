import _ = require("lodash");
import Component from "vue-class-component";
var VueStrap = require("vue-strap");

import {BaseComponent} from "./base-component";
import {serviceRegistry} from "../service/service-registry";
import {BaseEntity} from "../../common/entity/base-entity";

@Component({
  components: {
    modal: VueStrap.modal,
    tabs: VueStrap.tabset,
    tabGroup: VueStrap.tabGroup,
    tab: VueStrap.tab,
  },
  props: ["entity", "parent", "add"],
  ready: BaseEntityComponent.prototype.onReady,
})
export class BaseEntityComponent<T extends BaseEntity> extends BaseComponent {

  entity: T;
  parent: BaseEntityComponent<BaseEntity>;
  add: boolean;

  EntityClass:typeof BaseEntity;
  showModal: boolean;
  editEntity: T;

  get this(): BaseEntityComponent<BaseEntity> {
    return this;
  }

  data(): any {
    return _.assign(super.data(), {
      showModal: false,
      editEntity: null,
    });
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
      this.editEntity._parent = this.parent.entity._id;
      serviceRegistry.entity.add(this.editEntity).then(entity => {
        this.editEntity = <T>this.EntityClass.generateDefault();
        this.parent.reload();
      });
    } else {
      serviceRegistry.entity.edit(this.editEntity).then(entity => {
        this.parent.reload();
      });
    }
  }

  remove() {
    if (!confirm(`Are you sure you want to remove ${this.entity.Class.params.tableName} name:${this.entity.name}?`)) return;
    serviceRegistry.entity.remove(this.entity).then(entity => {
      this.parent.reload();
    });
  }

}
