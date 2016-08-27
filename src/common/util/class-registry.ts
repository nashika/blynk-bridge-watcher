import _ = require("lodash");

export abstract class ClassRegistry<T> {

  protected instances:{[key:string]:T};

  protected Classes:{[key:string]:Function};

  constructor() {
    this.instances = {};
  }

  public getClass(name:string):Function {
    let key = _.camelCase(name);
    if (this.Classes[key]) {
      return this.Classes[key];
    }
    return undefined;
  }

  public getAllClasses():{[key:string]:Function} {
    let result:{[key:string]:Function} = {};
    for (let key in this.Classes) {
      result[key] = this.Classes[key]
    }
    return result;
  }

  public getAllClassesArray():Function[] {
    let result:Function[];
    result = Object.keys(this.Classes).map(key => this.Classes[key]);
    return result;
  }

  public getInstance(name:string):T {
    let key = _.camelCase(name);
    if (this.instances[key]) {
      return this.instances[key];
    }
    let Class:any = this.Classes[key];
    if (Class) {
      let instance = new (<any>Class)();
      this.instances[key] = instance;
      return instance;
    }
    return undefined;
  }

  public getAllInstance():{[key:string]:T} {
    let result:{[key:string]:T} = {};
    for (let key in this.Classes) {
      result[key] = this.getInstance(key);
    }
    return this.instances;
  }

  public getAllInstanceArray():T[] {
    let result:T[];
    result = Object.keys(this.Classes).map(key => this.getInstance(key));
    return result;
  }

}
