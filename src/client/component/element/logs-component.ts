import Component from "vue-class-component";

import {BaseComponent} from "../base-component";
import {ISocketIoLogData} from "../../../common/util/socket-io-util";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {container} from "../../../common/inversify.config";

let template = require("./logs-component.jade");

@Component({
  template: template,
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

  socketIoClientService: SocketIoClientService = container.get(SocketIoClientService);
  page: number = 1;
  limit: number = 20;
  logs: ISocketIoLogData[] = null;

  show: boolean;
  id: string;

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
