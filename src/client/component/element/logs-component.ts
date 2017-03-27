import Component from "vue-class-component";

import BaseComponent from "../base-component";
import {ISocketIoLogData} from "../../../common/util/socket-io-util";
import {SocketIoClientService} from "../../service/socket-io-client-service";
import {container} from "../../../common/inversify.config";

@Component({})
export default class LogsComponent extends BaseComponent {

  protected socketIoClientService: SocketIoClientService = container.get(SocketIoClientService);

  protected page: number = 1;
  protected limit: number = 20;
  protected lastLog: ISocketIoLogData = null;
  protected logs: ISocketIoLogData[] = null;
  protected id: string = null;

  async show(id: string): Promise<void> {
    this.page = 1;
    this.id = id;
    (<any>this.$refs.modal).show();
    await this.reload();
  }

  protected async reload(): Promise<void> {
    this.logs = null;
    this.lastLog = await this.socketIoClientService.getLastLog(this.id);
    this.logs = await this.socketIoClientService.getLogs(this.id, this.page, this.limit);
  }

  protected async changePage(newPage: number): Promise<void> {
    this.page = newPage;
    await this.reload();
  }

}
