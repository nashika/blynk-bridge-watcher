import _ = require("lodash");

import {container} from "../../inversify.config";
import {BaseEntity} from "../base-entity";

export interface INodeEntityParams {
  table: string;
  type: string;
  subType?: string;
  icon: string;
  input: "none" | "null" | "integer" | "string";
  output: "none" | "null" | "integer" | "string";
  children: { [key: string]: typeof BaseNodeEntity };
  fields: { [name: string]: INodeEntityFieldParams };
}

export interface INodeEntityFieldParams {
  type: "text" | "number" | "boolean";
  default?: any;
  hidden?: boolean;
  required?: boolean;
  disabled?: boolean;
  options?: { [key: string]: string };
  filter?: string;
}

export type TNodeEntityNextNode = { id: string, param: string };

export abstract class BaseNodeEntity extends BaseEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "*",
    icon: "times",
    input: "none",
    output: "none",
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

  type: string;
  subType: string;
  _parent: string;
  _orderNo: number;
  label: string;

  get Class(): typeof BaseNodeEntity {
    return <typeof BaseNodeEntity>this.constructor;
  }

  static generateDefault<T extends BaseNodeEntity>(): T {
    let entity: T = <T>(new (<any>this)());
    _.forEach(this.params.fields, (field: INodeEntityFieldParams, name: string) => {
      if (!_.isUndefined(field.default) && field.required)
        _.set(entity, name, field.default);
    });
    entity.type = this.params.type;
    if (this.params.subType)
      entity.subType = this.params.subType;
    return entity;
  }

  static get subClasses(): typeof BaseNodeEntity[] {
    if (container.isBound(<any>this))
      return container.getAll<typeof BaseNodeEntity>(<any>this);
    else
      return null;
  }

}
