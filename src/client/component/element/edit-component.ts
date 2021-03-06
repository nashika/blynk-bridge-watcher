import _ = require("lodash");
import Component from "vue-class-component";
var VueStrap = require("vue-strap");

import {BaseComponent} from "../base-component";
import {BaseEntity} from "../../../common/entity/base-entity";
import {BaseNodeComponent} from "../node/base-node-component";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {kernel} from "../../../common/inversify.config";

let template = require("./edit-component.jade");

@Component({
  template: template,
  components: {
    modal: VueStrap.modal,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true,
    },
    EntityClass: {
      type: Function,
    },
    entity: {
      type: Object,
    },
    add: {
      type: Boolean,
    },
  },
  watch: {
    show: EditComponent.prototype.onChangeShow,
  },
})
export class EditComponent<T extends BaseEntity> extends BaseComponent {

  $parent : BaseNodeComponent<T>;

  socketIoClientService: SocketIoClientService;
  show: boolean;
  EntityClass: typeof BaseEntity;
  entity: T;
  add: boolean;

  editEntity: T;

  data(): any {
    return _.assign(super.data(), {
      socketIoClientService: kernel.get(SocketIoClientService),
      editEntity: null,
    });
  }

  onChangeShow() {
    if (this.show) {
      if (this.add) this.editEntity = <T>this.EntityClass.generateDefault();
      else this.editEntity = _.cloneDeep(this.entity);
    }
  }

  edit() {
    this.show = false;
    this.$parent.edit(this.editEntity);
  }

  getNodeOptions(filter: string): {[_id: string]: string} {
    return this.socketIoClientService.getNodeOptions(filter);
  }

}
