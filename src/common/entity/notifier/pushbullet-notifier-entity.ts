import _ = require("lodash");

import {IEntityFieldParams, IEntityParams} from "../base-entity";
import {BaseNotifierEntity} from "./base-notifier-entity";

export class PushbulletNotifierEntity extends BaseNotifierEntity {

  static defaultName = "NTPB01";
  static defaultType = "pushbullet";

  static params: IEntityParams = {
    tableName: "notifier",
    entityName: "pushbulletNotifier",
    icon: "bullhorn",
    children: {},
    fields: _.concat<IEntityFieldParams>(BaseNotifierEntity.params.fields, [
      {
        name: "apiKey",
        type: "text",
        required: true,
      },
    ]),
  };

  apiKey: string;

}
