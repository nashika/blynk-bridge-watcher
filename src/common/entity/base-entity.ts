import _ = require("lodash");

export class BaseEntity {

  _id:string;
  name:string;

  constructor(data:any) {
    _.forIn(data, (value, key) => {
      _.set(this, key, value);
    });
  }

}
