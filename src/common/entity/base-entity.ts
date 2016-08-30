import _ = require("lodash");

export interface IEntityParams {
  tableName: string;
  entityName: string;
  icon: string;
  children: {[key: string]: typeof BaseEntity};
  fields: IEntityFieldParams[];
}

export interface IEntityFieldParams {
  name: string;
  type: string;
  default?: any;
  required?: boolean;
  disabled?: boolean;
  options?: {[key: string]: string};
}

export class BaseEntity {

  static defaultName: string;
  static defaultType: string;

  static params: IEntityParams = {
    tableName: "",
    entityName: "",
    icon: "times",
    children: {},
    fields: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "label",
        type: "text",
      },
    ],
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
    let result:BaseEntity = new this();
    for (let field of this.params.fields) {
      if (!_.isUndefined(field.default) && field.required)
        _.set(result, field.name, field.default);
    }
    if (this.defaultName) result.name = this.defaultName;
    if (this.defaultType) _.set(result, "type", this.defaultType);
    return result;
  }

}
