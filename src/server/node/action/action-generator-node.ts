import {GeneratorNode} from "../generator-node";
import {ReadActionNode} from "./read-action-node";
import {WriteActionNode} from "./write-action-node";
import {LogActionNode} from "./log-action-node";
import {NotifyActionNode} from "./notify-action-node";
import {IfActionNode} from "./if-action-node";
import {ActionEntity} from "../../../common/entity/action-entity";

export class ActionGeneratorNode extends GeneratorNode<ActionEntity> {

  static EntityClass = ActionEntity;

  TYPE_TO_CLASS = {
    read: ReadActionNode,
    write: WriteActionNode,
    log: LogActionNode,
    notify: NotifyActionNode,
    if: IfActionNode,
  };

}
