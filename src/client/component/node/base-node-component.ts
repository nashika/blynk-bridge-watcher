import _ = require("lodash");
import Component from "vue-class-component";
import pluralize = require("pluralize");

import BaseComponent from "../base-component";
import {ISocketIoLogData, TSocketIoStatus} from "../../../common/util/socket-io-util";
import {NodeClientService} from "../../service/node-client-service";
import {container} from "../../../common/inversify.config";
import {BaseNodeEntity} from "../../../common/entity/node/base-node-entity";

@Component({
  props: {
    entity: {
      type: Object,
    },
    brotherEntities: {
      type: Array,
    },
    parent: {
      type: Object,
    },
    depth: {
      type: Number,
    },
  },
})
export default class BaseNodeComponent<T extends BaseNodeEntity> extends BaseComponent {

  entity: T;
  brotherEntities: T[];
  parent: BaseNodeComponent<BaseNodeEntity>;
  depth: number;

  EntityClass: typeof BaseNodeEntity = BaseNodeEntity;
  protected nodeClientService: NodeClientService = container.get(NodeClientService);

  showEdit: boolean = false;
  showLogs: boolean = false;
  runningCount: number = 0;
  status: TSocketIoStatus = "connecting";
  lastLog: ISocketIoLogData = null;

  get me(): BaseNodeComponent<BaseNodeEntity> {
    return this;
  }

  async mounted(): Promise<void> {
    if (this.entity) {
      this.nodeClientService.registerComponent(this);
      this.status = this.nodeClientService.getStatus(this.entity._id);
      this.lastLog = this.nodeClientService.getLastLog(this.entity._id);
      await this.reload();
    }
  }

  get title(): string {
    return `${this.entity.shortId} ${this.entity.label ? '(' + this.entity.label + ') ' : ''}[Type: ${_.startCase(this.EntityClass.params.subType || "")}${_.startCase(this.EntityClass.params.type)}]`;
  }

  run(..._args: any[]) {
    this.nodeClientService.send(this.entity._id);
  }

  notifyRun() {
    this.runningCount++;
    setTimeout(() => this.runningCount--, 1000);
  }

  setLastLog(log: ISocketIoLogData) {
    this.lastLog = log;
  }

  clearLog() {
    this.lastLog = null;
  }

  protected getChildEntities(ChildEntityClass: typeof BaseNodeEntity): T[] {
    return <T[]>_.get(this, pluralize(ChildEntityClass.params.type));
  }

  protected async reload(): Promise<void> {
    for (let key in this.EntityClass.params.children) {
      _.forEach(_.get(this, key), (entity: BaseNodeEntity) => {
        this.nodeClientService.unregisterComponent(entity._id);
      });
      _.set(this, key, null);
    }
    for (let key in this.EntityClass.params.children) {
      let EntityClass: typeof BaseNodeEntity = this.EntityClass.params.children[key];
      let entities = await this.nodeClientService.findChildren(EntityClass, this.entity._id);
      _.set(this, key, entities);
    }
  }

  protected async reloadParent(): Promise<void> {
    if (this.parent) {
      await this.parent.reload();
    } else {
      this.entity = await this.nodeClientService.findOne<T>(this.EntityClass, this.entity._id);
      await this.reload();
    }
  }

  protected async logs(): Promise<void> {
    await this.$root.logsComponent.show(this.entity._id);
  }

  protected async add(ChildEntityClass: typeof BaseNodeEntity): Promise<void> {
    let editEntity: T = await this.$root.editComponent.edit<T>(ChildEntityClass, null);
    if (!editEntity) return;
    editEntity._parent = this.entity._id;
    editEntity._orderNo = (_.max(this.getChildEntities(ChildEntityClass).map(entity => entity._orderNo)) + 1) || 1;
    await this.nodeClientService.add(editEntity);
    await this.reloadParent();
  }

  protected async edit(): Promise<void> {
    let editEntity: T = await this.$root.editComponent.edit<T>(this.EntityClass, this.entity);
    if (!editEntity) return;
    await this.nodeClientService.edit(editEntity);
    await this.reloadParent();
  }

  protected async remove(): Promise<void> {
    if (!confirm(`Are you sure you want to remove ${this.entity.Class.params.type} id:${this.entity._id}?`)) return;
    await this.nodeClientService.remove(this.entity);
    await this.reloadParent();
  }

  protected async move(directionUp: boolean): Promise<void> {
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
    await this.nodeClientService.edit(entity1);
    await this.nodeClientService.edit(entity2);
    await this.reloadParent();
  }

  protected get isRunning(): boolean {
    return this.runningCount > 0;
  }

  protected get isFirst(): boolean {
    if (!this.brotherEntities) return false;
    let index = this.brotherEntities.findIndex(entity => this.entity == entity);
    return index == 0;
  }

  protected get isLast(): boolean {
    if (!this.brotherEntities) return false;
    let index = this.brotherEntities.findIndex(entity => this.entity == entity);
    return index == this.brotherEntities.length - 1;
  }

  protected get buttonColor(): string {
    if (this.isRunning) return "danger";
    switch (this.status) {
      case "ready":
        return "success";
      case "stop":
        return "secondary";
      case "error":
        return "danger";
      case "connecting":
      case "processing":
        return "warning";
      default:
        return "secondary";
    }
  }

}
