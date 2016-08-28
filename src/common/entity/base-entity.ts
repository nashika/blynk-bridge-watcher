import _ = require("lodash");

export class BaseEntity {

  static modelName:string;

  _id:string;
  _parent:string;
  name:string;

  constructor(data:any = {}) {
    _.forIn(data, (value, key) => {
      _.set(this, key, value);
    });
  }

  get Class(): typeof BaseEntity {
    return <typeof BaseEntity>this.constructor;
  }

  static generateDefault():BaseEntity {
    return new BaseEntity();
  }

}
