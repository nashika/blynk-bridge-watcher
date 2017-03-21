import Component from "vue-class-component";

import {BaseComponent} from "../base-component";
import {ISocketIoLogData} from "../../../common/util/socket-io-util";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {container} from "../../../common/inversify.config";

let template = require("./logs-component.jade");

@Component({
  template: template,
})
export class LogsComponent extends BaseComponent {

  socketIoClientService: SocketIoClientService = container.get(SocketIoClientService);

  page: number = 1;
  limit: number = 20;
  logs: ISocketIoLogData[] = null;
  id: string = null;

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

  async show(id: string): Promise<void> {
    id
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
