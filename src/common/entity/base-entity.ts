import _ = require("lodash");

export interface IEntityParams {
  children: {[key: string]: typeof BaseEntity};
  fields: IEntityFieldParams[];
}

export interface IEntityFieldParams {
  name: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  options?: {[key: string]: string};
}

export class BaseEntity {

  static modelName: string;

  static params: IEntityParams = {
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
    return new BaseEntity();
  }

}
