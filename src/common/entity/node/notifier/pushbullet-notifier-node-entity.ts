import _ = require("lodash");

import {BaseNotifierNodeEntity} from "./base-notifier-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class PushbulletNotifierNodeEntity extends BaseNotifierNodeEntity {

  static params: INodeEntityParams = {
    table: "node",
    type: "notifier",
    subType: "pushbullet",
    icon: "bullhorn",
    input: "string",
    output: "none",
    children: {},
    fields: _.merge({}, BaseNotifierNodeEntity.params.fields, {
      apiKey: {
        type: "text",
        required: true,
      },
    }),
  };

  apiKey: string;

}
