import Component from "vue-class-component";

import {BaseComponent} from "./base-component";
import {BoardEntity} from "../../common/entity/board-entity";
import {serviceRegistry} from "../service/service-registry";
import {ServerComponent} from "./server-component";
import _ = require("lodash");

let template = require("./board-component.jade");

@Component({
  template: template,
  components: {
    dropdown: require("vue-strap").dropdown,
    modal: require("vue-strap").modal,
  },
  props: ["entity", "add"],
  ready: BoardComponent.prototype.onReady,
})
export class BoardComponent extends BaseComponent {

  $parent:ServerComponent;
  entity:BoardEntity;
  add:boolean;

  showModal:boolean;
  editEntity:BoardEntity;

  data():any {
    return {
      showModal: false,
      editEntity: null,
    }
  }

  onReady() {
    if (this.add) this.editEntity = BoardEntity.generateDefault();
    else this.editEntity = _.cloneDeep(this.entity);
  }

  edit() {
    this.showModal = false;
    if (this.add) {
      serviceRegistry.entity.add(BoardEntity, this.editEntity).then(entity => {
        this.$parent.reload();
      });
    } else {
      serviceRegistry.entity.edit(BoardEntity, this.editEntity).then(entity => {
        this.$parent.reload();
      });
    }
  }

  delete() {
    if (!confirm(`Are you sure you want to delete ${this.entity.Class.modelName} name:${this.entity.name}?`)) return;
    serviceRegistry.entity.delete(BoardEntity, this.entity).then(entity => {
      this.$parent.reload();
    });
  }

}
