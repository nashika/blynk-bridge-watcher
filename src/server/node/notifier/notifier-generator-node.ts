import {GeneratorNode} from "../generator-node";
import {LogNotifierNode} from "./log-notifier-node";
import {PushbulletNotifierNode} from "./pushbullet-notifier-node";
import {NotifierEntity} from "../../../common/entity/notifier-entity";

export class NotifierGeneratorNode extends GeneratorNode<NotifierEntity> {

  static EntityClass = NotifierEntity;

  TYPE_TO_CLASS = {
    log: LogNotifierNode,
    pushbullet: PushbulletNotifierNode,
  };

}
