import {GeneratorNode} from "../generator-node";
import {LogNotifierNode} from "./log-notifier-node";
import {PushbulletNotifierNode} from "./pushbullet-notifier-node";
import {BaseNotifierEntity} from "../../../common/entity/notifier/base-notifier-entity";

export class NotifierGeneratorNode extends GeneratorNode<BaseNotifierEntity> {

  static EntityClass = BaseNotifierEntity;

  TYPE_TO_CLASS = {
    log: LogNotifierNode,
    pushbullet: PushbulletNotifierNode,
  };

}
