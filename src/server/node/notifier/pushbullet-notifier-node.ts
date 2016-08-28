import {NotifierEntity} from "../../../common/entity/notifier-entity";
var Pushbullet = require("pushbullet");

import {NotifierNode} from "./notifier-node";
import {ServerNode} from "../server-node";

type Pushbullet = any;

export class PushbulletNotifierNode extends NotifierNode {

  protected _pushbullet:Pushbullet;

  constructor(parent:ServerNode, entity:NotifierEntity) {
    super(parent, entity);
    let apiKey:string = this._checkConfig(entity, "apiKey", "string");
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
