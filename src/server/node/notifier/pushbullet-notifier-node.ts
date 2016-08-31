var Pushbullet = require("pushbullet");

import {NotifierNode} from "./notifier-node";
import {ServerNode} from "../server-node";
import {PushbulletNotifierEntity} from "../../../common/entity/notifier/pushbullet-notifier-entity";

type Pushbullet = any;

export class PushbulletNotifierNode extends NotifierNode<PushbulletNotifierEntity> {

  protected _pushbullet:Pushbullet;

  initialize():Promise<void> {
    return super.initialize().then(() => {
      this._pushbullet = new Pushbullet(this.entity.apiKey);
      this._pushbullet.me((err: any, response: any) => {
        if (err) {
          this.log("fatal", `Pushbullet auth failed.`);
          process.exit(1);
        } else {
          this.log("info", `Pushbullet auth succeed. response=${JSON.stringify(response)}`);
        }
      });
    });
  }

  protected send(messages:string[]) {
    let title = `Receive ${messages.length} messages.`;
    let message = messages.join("\n");
    this._pushbullet.note(null, title, message, (err:any) => {
      if (err)
        this.log("error", `Send pushbullet was failed.`);
      else
        this.log("debug", `Send pushbullet was succeed.`);
    });
  }

}
