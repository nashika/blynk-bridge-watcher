import _ = require("lodash");
import Component from "vue-class-component";

import {BaseComponent} from "../base-component";
import {BaseEntity} from "../../../common/entity/base-entity";
import {TSocketIoStatus} from "../../../common/util/socket-io-util";
import {LogsComponent} from "../element/logs-component";
import {EditComponent} from "../element/edit-component";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {EntityService} from "../../service/entity-service";
import {container} from "../../../common/inversify.config";

@Component({
  components: {
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

  EntityClass: typeof BaseEntity = BaseEntity;
  entityService: EntityService = container.get(EntityService);
  socketIoClientService: SocketIoClientService = container.get(SocketIoClientService);
  showEdit: boolean = false;
  showLogs: boolean = false;
  runningCount: number = 0;
  status: TSocketIoStatus = "connecting";
  countLog: number = 0;

  entity: T;
  brotherEntities: T[];
  parent: BaseNodeComponent<BaseEntity>;
  add: boolean;

  get this(): BaseNodeComponent<BaseEntity> {
    return this;
  }

  mounted() {
    if (!this.add) {
      this.socketIoClientService.registerComponent(this);
      this.status = this.socketIoClientService.getStatus(this.entity._id);
      this.countLog = this.socketIoClientService.getCountLog(this.entity._id);
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

  run(..._args: any[]) {
    this.socketIoClientService.send(this.entity._id);
  }

  edit(editEntity: T) {
    if (this.add) {
      editEntity._parent = this.parent.entity._id;
      editEntity._orderNo = (_.max(this.brotherEntities.map(entity => entity._orderNo)) + 1) || 1;
      this.entityService.add(editEntity).then(_entity => {
        editEntity = <T>this.EntityClass.generateDefault();
        this.parent.reload();
      });
    } else {
      this.entityService.edit(editEntity).then(_entity => {
        this.parent.reload();
      });
    }
  }

  remove() {
    if (!confirm(`Are you sure you want to remove ${this.entity.Class.params.tableName} id:${this.entity._id}?`)) return;
    this.entityService.remove(this.entity).then(_entity => {
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
    }).then(_entity => {
      return this.entityService.edit(entity2);
    }).then(_entity => {
      this.parent.reload();
    });
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
