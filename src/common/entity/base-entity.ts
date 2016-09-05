import _ = require("lodash");

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

export class BaseEntity {

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
      name: {
        type: "text",
        required: true,
      },
      label: {
        type: "text",
      },
    },
  };

  _id: string;
  _parent: string;
  _orderNo: number;
  name: string;

  constructor(data: any = {}) {
    _.forIn(data, (value, key) => {
      _.set(this, key, value);
    });
  }

  get Class(): typeof BaseEntity {
    return <typeof BaseEntity>this.constructor;
  }

  static generateDefault(): BaseEntity {
    let result: BaseEntity = new this();
    _.forEach(this.params.fields, (field: IEntityFieldParams, name: string) => {
      if (!_.isUndefined(field.default) && field.required)
        _.set(result, name, field.default);
    });
    return result;
  }

}
