import _ = require("lodash");

import {BaseEntity, IEntityParams, IEntityFieldParams} from "./base-entity";

export class JobEntity extends BaseEntity {

  static modelName = "job";
  static defaultName = "JB01";

  static params: IEntityParams = {
    icon: "clock-o",
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseEntity.params.fields, [
      {
        name: "cronTime",
        type: "text",
        default: "0 0 0 * * *",
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

}
