var Pushbullet = require("pushbullet");

import {Notifier} from "./notifier";
import {Server} from "../server";

type Pushbullet = any;

export class PushbulletNotifier extends Notifier {

  protected _pushbullet:Pushbullet;

  constructor(parent:Server, config:Object) {
    super(parent, config);
    let apiKey:string = this._checkConfig(config, "apiKey", "string");
    this._pushbullet = new Pushbullet(apiKey);
    this._pushbullet.me((err:any, response:any) => {
      if (err) {
        this.log("fatal", `Pushbullet auth failed.`);
        process.exit(1);
      } else {
        this.log("info", `Pushbullet auth succeed. response=${JSON.stringify(response)}`);
      }
    });
  }

  protected send(messages:string[]) {
    let title = messages.length == 1 ? messages[0] : `Receive ${messages.length} messages.`;
    let message = messages.join("\n");
    this._pushbullet.note(null, title, message, (err:any) => {
      if (err)
        this.log("error", `Send pushbullet note was failed.`);
      else
        this.log("debug", `Send pushbullet not was succeed.`);
    });
  }

}
