import _ = require("lodash");
import Component from "vue-class-component";
var VueStrap = require("vue-strap");

import {BaseComponent} from "./base-component";
import {serviceRegistry} from "../service/service-registry";
import {BaseEntity, IEntityFieldParams} from "../../common/entity/base-entity";
import {TSocketIoStatus} from "../../common/util/socket-io-util";

@Component({
  components: {
    modal: VueStrap.modal,
    tabs: VueStrap.tabset,
    tabGroup: VueStrap.tabGroup,
    tab: VueStrap.tab,
  },
  props: ["entity", "brotherEntities", "parent", "add"],
  ready: BaseEntityComponent.prototype.onReady,
})
export class BaseEntityComponent<T extends BaseEntity> extends BaseComponent {

  entity: T;
  brotherEntities: T[];
  parent: BaseEntityComponent<BaseEntity>;
  add: boolean;

  EntityClass: typeof BaseEntity;
  showModal: boolean;
  editEntity: T;
  status: TSocketIoStatus;

  get this(): BaseEntityComponent<BaseEntity> {
    return this;
  }

  data(): any {
    return _.assign(super.data(), {
      showModal: false,
      editEntity: null,
      status: "connecting",
    });
  }

  onReady() {
    if (this.add) this.editEntity = <T>this.EntityClass.generateDefault();
    else this.editEntity = _.cloneDeep(this.entity);
    if (!this.add) {
      serviceRegistry.socketIo.registerComponent(this);
      this.status = serviceRegistry.socketIo.getStatus(this.entity._id);
      this.reload();
    }
  }

  reload() {
    _.forIn(this.EntityClass.params.children, (EntityClass: typeof BaseEntity, key: string) => {
      _.forEach(_.get(this, key), (entity: BaseEntity) => {
        serviceRegistry.socketIo.unregisterComponent(entity._id);
      });
      _.set(this, key, null);
      serviceRegistry.entity.getChildren(EntityClass, this.entity._id).then(entities => {
        _.set(this, key, entities);
      });
    });
  }

  edit() {
    this.showModal = false;
    _.forEach(this.EntityClass.params.fields, (field:IEntityFieldParams) => {
      field.type
    });
    if (this.add) {
      this.editEntity._parent = this.parent.entity._id;
      this.editEntity._orderNo = (_.max(this.brotherEntities.map(entity => entity._orderNo)) + 1) || 1;
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

  move(directionUp: boolean) {
    let entity1: T, entity2: T;
    let index = this.brotherEntities.findIndex(entity => this.entity == entity);
    if (directionUp) {
      if (this.isLast) return;
      entity1 = this.entity;
      entity2 = this.brotherEntities[index + 1];
    } else {
      if (this.isFirst) return;
      entity1 = this.brotherEntities[index - 1];
      entity2 = this.entity;
    }
    let tmpNo = entity1._orderNo;
    entity1._orderNo = entity2._orderNo;
    entity2._orderNo = tmpNo;
    Promise.resolve().then(() => {
      return serviceRegistry.entity.edit(entity1);
    }).then(entity => {
      return serviceRegistry.entity.edit(entity2);
    }).then(entity => {
      this.parent.reload();
    });
  }

  get isFirst(): boolean {
    if (!this.brotherEntities) return false;
    let index = this.brotherEntities.findIndex(entity => this.entity == entity);
    return index == 0;
  }

  get isLast(): boolean {
    if (!this.brotherEntities) return false;
    let index = this.brotherEntities.findIndex(entity => this.entity == entity);
    return index == this.brotherEntities.length - 1;
  }

}
