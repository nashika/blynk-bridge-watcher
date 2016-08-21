import {Generator} from "../generator";
import {LogNotifier} from "./log-notifier";
import {PushbulletNotifier} from "./pushbullet-notifier";

export class NotifierGenerator extends Generator {

  TYPE_TO_CLASS = {
    log: LogNotifier,
    pushbullet: PushbulletNotifier,
  };

}
