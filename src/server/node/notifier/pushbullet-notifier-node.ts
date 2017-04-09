import {injectable} from "inversify";
var Pushbullet = require("pushbullet");

import {NotifierNode} from "./notifier-node";
import {PushbulletNotifierNodeEntity} from "../../../common/entity/node/notifier/pushbullet-notifier-node-entity";
import {NodeServerService} from "../../service/node-server-service";

type Pushbullet = any;

@injectable()
export class PushbulletNotifierNode extends NotifierNode<PushbulletNotifierNodeEntity> {

  private pushbullet: Pushbullet;

  constructor(protected nodeServerService: NodeServerService) {
    super(nodeServerService);
  }

  protected async initialize(): Promise<void> {
    this.pushbullet = new Pushbullet(this.entity.apiKey);
    this.pushbullet.me((err: any, response: any) => {
      if (err) {
        this.log("fatal", `Pushbullet auth failed.`);
        this.status = "error";
      } else {
        this.log("info", `Pushbullet auth succeed. response=${JSON.stringify(response)}`);
        this.status = "ready";
      }
    });
    await super.initialize();
  }

  protected send(messages: string[]) {
    let title = `Receive ${messages.length} messages.`;
    let message = messages.join("\n");
    this.pushbullet.note(null, title, message, (err: any) => {
      if (err)
        this.log("error", `Send pushbullet was failed.`);
      else
        this.log("debug", `Send pushbullet was succeed.`);
    });
  }

}
