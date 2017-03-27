import _ = require("lodash");
import {container} from "../inversify.config";

export interface IEntityParams {
  tableName: string;
  entityName: string;
  icon: string;
  children: {[key: string]: typeof BaseEntity};
  fields: {[name: string]: IEntityFieldParams};
}

export interface IEntityFieldParams {
  type: string;
  default?: any;
  hidden?: boolean;
  required?: boolean;
  disabled?: boolean;
  options?: {[key: string]: string};
  filter?: string;
}

export abstract class BaseEntity {

  static params: IEntityParams = {
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

  _id: string;
  _parent: string;
  _orderNo: number;
  label: string;

  constructor(data: any = {}) {
    _.forIn(data, (value, key) => {
      _.set(this, key, value);
    });
  }

  get Class(): typeof BaseEntity {
    return <typeof BaseEntity>this.constructor;
  }

  get shortId(): string {
    return this._id.substr(0, 4);
  }

  static generateDefault<T extends BaseEntity>(): T {
    let result: T = <T>(new (<any>this)());
    _.forEach(this.params.fields, (field: IEntityFieldParams, name: string) => {
      if (!_.isUndefined(field.default) && field.required)
        _.set(result, name, field.default);
    });
    return result;
  }

  static get subClasses(): typeof BaseEntity[] {
    if (container.isBound(<any>this))
      return container.getAll<typeof BaseEntity>(<any>this);
    else
      return null;
  }

}
