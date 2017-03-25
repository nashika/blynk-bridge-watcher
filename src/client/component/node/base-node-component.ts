import _ = require("lodash");
import Component from "vue-class-component";

import BaseComponent from "../base-component";
import {BaseEntity} from "../../../common/entity/base-entity";
import {TSocketIoStatus} from "../../../common/util/socket-io-util";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {EntityService} from "../../service/entity-service";
import {container} from "../../../common/inversify.config";

@Component({
  props: {
    entity: {
      type: Object,
    },
    brotherEntities: {
      type: Array,
    },
    parent: {
      type: Window,
    },
    add: {
      type: Boolean,
    },
    depth: {
      type: Number,
    },
  },
})
export default class BaseNodeComponent<T extends BaseEntity> extends BaseComponent {

  entity: T;
  brotherEntities: T[];
  parent: BaseNodeComponent<BaseEntity>;
  add: boolean;
  depth: number;

  EntityClass: typeof BaseEntity = BaseEntity;
  entityService: EntityService = container.get(EntityService);
  socketIoClientService: SocketIoClientService = container.get(SocketIoClientService);

  showEdit: boolean = false;
  showLogs: boolean = false;
  runningCount: number = 0;
  status: TSocketIoStatus = "connecting";
  countLog: number = 0;

  get this(): BaseNodeComponent<BaseEntity> {
    return this;
  }

  async mounted(): Promise<void> {
    if (!this.add) {
      this.socketIoClientService.registerComponent(this);
      this.status = this.socketIoClientService.getStatus(this.entity._id);
      this.countLog = this.socketIoClientService.getCountLog(this.entity._id);
      await this.reload();
    }
  }

  async reload(): Promise<void> {
    for (let key in this.EntityClass.params.children) {
      let EntityClass: typeof BaseEntity = this.EntityClass.params.children[key];
      _.forEach(_.get(this, key), (entity: BaseEntity) => {
        this.socketIoClientService.unregisterComponent(entity._id);
      });
      _.set(this, key, null);
      let entities = await this.entityService.getChildren(EntityClass, this.entity._id);
      _.set(this, key, entities);
    }
  }

  run(..._args: any[]) {
    this.socketIoClientService.send(this.entity._id);
  }

  async edit(): Promise<void> {
    let editEntity: T = await this.$root.editComponent.edit<T>(this.EntityClass, this.add ? null : this.entity);
    if (this.add) {
      editEntity._parent = this.parent.entity._id;
      editEntity._orderNo = (_.max(this.brotherEntities.map(entity => entity._orderNo)) + 1) || 1;
      await this.entityService.add(editEntity);
    } else {
      await this.entityService.edit(editEntity);
    }
    await this.parent.reload();
  }

  async remove(): Promise<void> {
    if (!confirm(`Are you sure you want to remove ${this.entity.Class.params.tableName} id:${this.entity._id}?`)) return;
    await this.entityService.remove(this.entity);
    await this.parent.reload();
  }

  async move(directionUp: boolean): Promise<void> {
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
    await this.entityService.edit(entity1);
    await this.entityService.edit(entity2);
    await this.parent.reload();
  }

  notifyRun() {
    this.runningCount++;
    setTimeout(() => this.runningCount--, 1000);
  }

  setCountLog(count: number) {
    this.countLog = count;
  }

  clearLog() {
    this.countLog = 0;
  }

  get title(): string {
    return `${this.entity.shortId} ${this.entity.label ? '(' + this.entity.label + ') ' : ''}[Type: ${_.startCase(this.EntityClass.params.entityName)}]`;
  }

  get isRunning(): boolean {
    return this.runningCount > 0;
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
