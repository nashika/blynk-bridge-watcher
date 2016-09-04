var Pushbullet = require("pushbullet");

import {NotifierNode} from "./notifier-node";
import {ServerNode} from "../server-node";
import {PushbulletNotifierEntity} from "../../../common/entity/notifier/pushbullet-notifier-entity";

type Pushbullet = any;

export class PushbulletNotifierNode extends NotifierNode<PushbulletNotifierEntity> {

  private pushbullet: Pushbullet;

  initialize(): Promise<void> {
    this.pushbullet = new Pushbullet(this.entity.apiKey);
    this.pushbullet.me((err: any, response: any) => {
      if (err) {
        this.log("fatal", `Pushbullet auth failed.`);
        process.exit(1);
      } else {
        this.log("info", `Pushbullet auth succeed. response=${JSON.stringify(response)}`);
      }
    });
    return super.initialize();
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
