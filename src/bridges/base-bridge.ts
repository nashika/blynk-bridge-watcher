import {Base} from "../base";
import {ActionGenerator} from "../actions/action-generator";
import {Board} from "../board";
import {Action} from "../actions/action";

export type WidgetBridge = any;

export class BaseBridge extends Base {

  STATUS_TYPES:{[status:string]:{label:string}} = {
    constructing: {
      label: "Constructing",
    },
    connecting: {
      label: "Connecting",
    },
    ready: {
      label: "Ready",
    },
    error: {
      label: "Error",
    },
  };

  parent:Board;
  status:{label:string} = this.STATUS_TYPES["constructing"];
  actions:{[name:string]:Action};
  protected _token:string;
  protected _widgetBridge:WidgetBridge;

  constructor(parent:Board, config:Object) {
    super(parent, config);
    this.log("info", `Connect bridge was started.`);
    this._token = this._checkConfig(config, "token", "string");
    this._widgetBridge = new this.parent.blynk.WidgetBridge(Object.keys(parent.bridges).length + 1);
    this._initializeChildrenWithGenerator(config, "actions", ActionGenerator);
    for (let actionName in this.actions) {
      let action:Action = this.actions[actionName];
      this.on(actionName, action.run);
      for (let alias of action.aliases)
        this.on(alias, action.run);
    }
  }

  connect() {
    this.log("info", `Connection started.`);
    this.status = this.STATUS_TYPES["connecting"];
    this._widgetBridge.setAuthToken(this._token);
  }

  log(level:string, message:string, ...args:string[]) {
    super.log(level, message, ...args);
    this.emit(`$${level}`, this, `[${level}] ${message}`, ...args);
  }

}
