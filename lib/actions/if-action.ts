import {Action} from "./action";
import {Bridge} from "../bridges/bridge";

export class IfAction extends Action {

  protected _operator:string;
  protected _value:number = -1;
  protected _then:string = "";
  protected _else:string = "";

  constructor(parent:Bridge, config:Object) {
    super(parent, config);
    this._operator = this._checkConfig(config, "operator", "string");
    this._value = this._checkConfig(config, "value", "number");
    this._then = this._addSubAction(parent, config, "then");
    this._else = this._addSubAction(parent, config, "else");
  }

  run = (bridge:Bridge, ...args:string[]) => {
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
