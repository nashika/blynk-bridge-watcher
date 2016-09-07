import _ = require("lodash");

import {IEntityParams} from "../base-entity";
import {BaseNotifierEntity} from "./base-notifier-entity";

export class PushbulletNotifierEntity extends BaseNotifierEntity {

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "pushbulletNotifier",
    icon: "bullhorn",
    children: {},
    fields: _.merge({}, BaseNotifierEntity.params.fields, {
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
