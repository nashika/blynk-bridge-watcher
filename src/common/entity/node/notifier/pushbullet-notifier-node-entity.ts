import _ = require("lodash");

import {BaseNotifierNodeEntity} from "./base-notifier-node-entity";
import {INodeEntityParams} from "../base-node-entity";

export class PushbulletNotifierNodeEntity extends BaseNotifierNodeEntity {

  static params: INodeEntityParams = {
    tableName: "notifier",
    entityName: "pushbulletNotifier",
    icon: "bullhorn",
    children: {},
    fields: _.merge({}, BaseNotifierNodeEntity.params.fields, {
      type: {
        default: "pushbullet",
      },
      apiKey: {
        type: "text",
        required: true,
      },
    }),
  };

  apiKey: string;

}
