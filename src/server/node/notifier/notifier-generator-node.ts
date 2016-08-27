import {GeneratorNode} from "../generator-node";
import {LogNotifierNode} from "./log-notifier-node";
import {PushbulletNotifierNode} from "./pushbullet-notifier-node";

export class NotifierGeneratorNode extends GeneratorNode {

  TYPE_TO_CLASS = {
    log: LogNotifierNode,
    pushbullet: PushbulletNotifierNode,
  };

}
