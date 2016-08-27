import {BaseNode} from "../base-node";
import {ActionGeneratorNode} from "../action/action-generator-node";
import {BoardNode} from "../board-node";
import {ActionNode} from "../action/action-node";

export type WidgetBridge = any;

export class BaseBridgeNode extends BaseNode {

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

  parent:BoardNode;
  status:{label:string} = this.STATUS_TYPES["constructing"];
  actions:{[name:string]:ActionNode};
  protected _token:string;
  protected _widgetBridge:WidgetBridge;

  constructor(parent:BoardNode, config:Object) {
    super(parent, config);
    this.log("info", `Connect bridge was started.`);
    this._token = this._checkConfig(config, "token", "string");
    this._widgetBridge = new this.parent.blynk.WidgetBridge(Object.keys(parent.bridges).length + 1);
    this._initializeChildrenWithGenerator(config, "actions", ActionGeneratorNode);
    for (let actionName in this.actions) {
      let action:ActionNode = this.actions[actionName];
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
