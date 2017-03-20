import request = require("superagent");
import {injectable} from "inversify";

import {BaseService} from "./base-service";

@injectable()
export class ServerService extends BaseService {

  start(): Promise<void> {
    let url: string = `/server/start`;
    return request.get(url).then(() => {
      return;
    });
  }

  stop(): Promise<void> {
    let url: string = `/server/stop`;
    return request.get(url).then(() => {
      return;
    });
  }

}
