import _ = require("lodash");

import {container} from "../../inversify.config";
import {BaseEntity} from "../base-entity";

export interface INodeEntityParams {
  tableName: string;
  entityName: string;
  icon: string;
  children: {[key: string]: typeof BaseNodeEntity};
  fields: {[name: string]: INodeEntityFieldParams};
}

export interface INodeEntityFieldParams {
  type: string;
  default?: any;
  hidden?: boolean;
  required?: boolean;
  disabled?: boolean;
  options?: {[key: string]: string};
  filter?: string;
}

export abstract class BaseNodeEntity extends BaseEntity {

  static params: INodeEntityParams = {
    tableName: "",
    entityName: "",
    icon: "times",
    children: {},
    fields: {
      _id: {
        type: "text",
        hidden: true,
      },
      _parent: {
        type: "text",
        hidden: true,
      },
      _orderNo: {
        type: "number",
        hidden: true,
      },
      label: {
        type: "text",
      },
    },
  };

  _parent: string;
  _orderNo: number;
  type: string;
  label: string;

  get Class(): typeof BaseNodeEntity {
    return <typeof BaseNodeEntity>this.constructor;
  }

  get shortId(): string {
    if (this._id)
      return this._id.substr(0, 4);
    else
      return "";
  }

  static generateDefault<T extends BaseNodeEntity>(): T {
    let result: T = <T>(new (<any>this)());
    _.forEach(this.params.fields, (field: INodeEntityFieldParams, name: string) => {
      if (!_.isUndefined(field.default) && field.required)
        _.set(result, name, field.default);
    });
    return result;
  }

  static get subClasses(): typeof BaseNodeEntity[] {
    if (container.isBound(<any>this))
      return container.getAll<typeof BaseNodeEntity>(<any>this);
    else
      return null;
  }

}
