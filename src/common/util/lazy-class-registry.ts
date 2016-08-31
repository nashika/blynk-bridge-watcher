import fs = require("fs");

import _ = require("lodash");

export interface ILazyClassRegistryFiles {
  [key: string]: {path: string, name: string};
}

export abstract class LazyClassRegistry<T> {

  protected files: ILazyClassRegistryFiles;

  getClass(name: string): Function {
    let key = _.camelCase(name);
    if (this.files[key]) {
      let path = this.files[key].path;
      let className = this.files[key].name;
      return this.require(path)[className];
    }
    return undefined;
  }

  abstract require(path: string): any;

}
