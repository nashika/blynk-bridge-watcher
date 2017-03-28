import _ = require("lodash");

import {IEntityParams} from "../../base-entity";
import {BaseNotifierNodeEntity} from "./base-notifier-node-entity";

export class PushbulletNotifierNodeEntity extends BaseNotifierNodeEntity {

  static params: IEntityParams = {
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
