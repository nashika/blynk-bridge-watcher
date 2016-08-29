import {ActionNode} from "./action-node";
import {BridgeNode} from "../bridge/bridge-node";
import {BaseActionEntity} from "../../../common/entity/action/base-action-entity";

export class IfActionNode extends ActionNode {

  protected _operator:string;
  protected _value:number = -1;
  protected _then:string = "";
  protected _else:string = "";

  constructor(parent:BridgeNode, entity:BaseActionEntity) {
    super(parent, entity);
    this._operator = this._checkConfig(entity, "operator", "string");
    this._value = this._checkConfig(entity, "value", "number");
    this._then = this._addSubAction(parent, entity, "then");
    this._else = this._addSubAction(parent, entity, "else");
  }

  run = (bridge:BridgeNode, ...args:string[]) => {
    if (args.length < 1)
      return this.log("warn", `If action called no argument.`);
    let arg = parseInt(args[0]);
    if (isNaN(arg))
      return this.log("warn", `If action called not integer argument. arg='${args[0]}'`);
    let result = false;
    switch (this._operator) {
      case "=":
      case "==":
        result = arg == this._value;
        break;
      case "<":
        result = arg < this._value;
        break;
      case ">":
        result = arg > this._value;
        break;
      case "<=":
        result = arg <= this._value;
        break;
      case ">=":
        result = arg >= this._value;
        break;
      case "!=":
      case "<>":
        result = arg != this._value;
        break;
      default:
        return this.log("warn", `Operator '${this._operator}' is invalid.`);
    }
    this.log("debug", `If action. '(${arg} ${this._operator} ${this._value}) = ${result}'`);
    if (result && this._then)
      bridge.emit(this._then, bridge, ...args);
    else if (!result && this._else)
      bridge.emit(this._else, bridge, ...args);
  };

}
