import {Base} from "./base";
import {Board} from "./board";
import {Notifier} from "./notifiers/notifier";
import {NotifierGenerator} from "./notifiers/notifier-generator";
import {Job} from "./job";

export class Server extends Base {

  boards:{[name:string]:Board};
  notifiers:{[name:string]:Notifier};
  jobs:{[name:string]:Job};

  constructor(config:Object) {
    super(null, config);
    this._initializeChildren(config, "boards", Board);
    this._initializeChildrenWithGenerator(config, "notifiers", NotifierGenerator);
    this._initializeChildren(config, "jobs", Job);
  }

}
