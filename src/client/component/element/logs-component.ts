import _ = require("lodash");
import Component from "vue-class-component";
var VueStrap = require("vue-strap");

import {BaseComponent} from "../base-component";
import {ISocketIoLogData} from "../../../common/util/socket-io-util";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {container} from "../../../common/inversify.config";

let template = require("./logs-component.jade");

@Component({
  template: template,
  components: {
    modal: VueStrap.modal,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
      twoWay: true,
    },
    id: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    }
  },
  watch: {
    show: LogsComponent.prototype.onChangeShow,
  },
})
export class LogsComponent extends BaseComponent {

  show: boolean;
  id: string;

  socketIoClientService: SocketIoClientService;
  page: number;
  limit: number;
  logs: ISocketIoLogData[];

  data(): any {
    return _.assign(super.data(), {
      socketIoClientService: container.get(SocketIoClientService),
      page: 1,
      limit: 20,
      logs: null,
    });
  }

  onChangeShow() {
    if (!this.show) return;
    this.page = 1;
    this.reload();
  }

  reload() {
    this.logs = null;
    this.socketIoClientService.getLogs(this.id, this.page, this.limit).then(logs => {
      this.logs = logs;
    });
  }

  previous() {
    this.page++;
    this.reload();
  }

  next() {
    this.page--;
    this.reload();
  }

}
