import {Generator} from "../generator";
import {ReadAction} from "./read-action";
import {WriteAction} from "./write-action";
import {LogAction} from "./log-action";
import {NotifyAction} from "./notify-action";
import {IfAction} from "./if-action";

export class ActionGenerator extends Generator {

  TYPE_TO_CLASS = {
    read: ReadAction,
    write: WriteAction,
    log: LogAction,
    notify: NotifyAction,
    if: IfAction,
  };

}
