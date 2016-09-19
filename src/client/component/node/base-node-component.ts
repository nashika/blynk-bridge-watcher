import _ = require("lodash");
import Component from "vue-class-component";
var VueStrap = require("vue-strap");

import {BaseComponent} from "../base-component";
import {BaseEntity} from "../../../common/entity/base-entity";
import {TSocketIoStatus, ISocketIoLogData} from "../../../common/util/socket-io-util";
import {LogsComponent} from "../element/logs-component";
import {EditComponent} from "../element/edit-component";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {EntityService} from "../../service/entity-service";
import {kernel} from "../../../common/inversify.config";

@Component({
  components: {
    dropdown: VueStrap.dropdown,
    tooltip: VueStrap.tooltip,
    tabs: VueStrap.tabset,
    tabGroup: VueStrap.tabGroup,
    tab: VueStrap.tab,
    "logs-component": LogsComponent,
    "edit-component": EditComponent,
  },
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
    add: {
      type: Boolean,
    }
  },
})
export class BaseNodeComponent<T extends BaseEntity> extends BaseComponent {

  entity: T;
  brotherEntities: T[];
  parent: BaseNodeComponent<BaseEntity>;
  add: boolean;

  EntityClass: typeof BaseEntity;
  entityService: EntityService;
  socketIoClientService: SocketIoClientService;
  showEdit: boolean;
  showLogs: boolean;
  runningCount: number;
  status: TSocketIoStatus;
  logs: ISocketIoLogData[];

  get this(): BaseNodeComponent<BaseEntity> {
    return this;
  }

  data(): any {
    return _.assign(super.data(), {
      entityService: kernel.get(EntityService),
      socketIoClientService: kernel.get(SocketIoClientService),
      showEdit: false,
      showLogs: false,
      runningCount: 0,
      status: "connecting",
      logs: [],
    });
  }

  ready() {
    if (!this.add) {
      this.socketIoClientService.registerComponent(this);
      this.status = this.socketIoClientService.getStatus(this.entity._id);
      this.logs = this.socketIoClientService.getLogs(this.entity._id);
      this.reload();
    }
  }

  reload() {
    _.forIn(this.EntityClass.params.children, (EntityClass: typeof BaseEntity, key: string) => {
      _.forEach(_.get(this, key), (entity: BaseEntity) => {
        this.socketIoClientService.unregisterComponent(entity._id);
      });
      _.set(this, key, null);
      this.entityService.getChildren(EntityClass, this.entity._id).then(entities => {
        _.set(this, key, entities);
      });
    });
  }

  run(...args: any[]) {
    this.socketIoClientService.send(this.entity._id);
  }

  edit(editEntity: T) {
    if (this.add) {
      editEntity._parent = this.parent.entity._id;
      editEntity._orderNo = (_.max(this.brotherEntities.map(entity => entity._orderNo)) + 1) || 1;
      this.entityService.add(editEntity).then(entity => {
        editEntity = <T>this.EntityClass.generateDefault();
        this.parent.reload();
      });
    } else {
      this.entityService.edit(editEntity).then(entity => {
        this.parent.reload();
      });
    }
  }

  remove() {
    if (!confirm(`Are you sure you want to remove ${this.entity.Class.params.tableName} id:${this.entity._id}?`)) return;
    this.entityService.remove(this.entity).then(entity => {
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
      return this.entityService.edit(entity1);
    }).then(entity => {
      return this.entityService.edit(entity2);
    }).then(entity => {
      this.parent.reload();
    });
  }

  notifyRun() {
    this.runningCount++;
    setTimeout(() => this.runningCount--, 1000);
  }

  addLog(data: ISocketIoLogData) {
    this.logs.push(data);
  }

  clearLog() {
    this.logs = [];
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
