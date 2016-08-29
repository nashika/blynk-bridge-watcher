import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";

export class JobEntity extends BaseEntity {

  static modelName = "job";

  static params: IEntityParams = {
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseEntity.params.fields, [
      {
        name: "cronTime",
        type: "text",
        required: true,
      },
      {
        name: "board",
        type: "text",
        required:true,
      },
      {
        name: "bridge",
        type: "text",
        required: true,
      },
      {
        name: "action",
        type: "text",
        required: true,
      },
    ]),
  };

  static generateDefault(): JobEntity {
    let result = new JobEntity();
    result.name = "JB01";
    return result;
  }

}
