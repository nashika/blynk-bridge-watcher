import express = require("express");
import {Express} from "express";

import {IndexRoute} from "./index-route";
import {ServerRoute} from "./server-route";
import {BoardRoute} from "./board-route";
import {BridgeRoute} from "./bridge-route";
import {NotifierRoute} from "./notifier-route";
import {ActionRoute} from "./action-route";
import {JobRoute} from "./job-route";

export function routes(app:Express) {

  new IndexRoute(app);
  new ServerRoute(app);
  new BoardRoute(app);
  new BridgeRoute(app);
  new ActionRoute(app);
  new NotifierRoute(app);
  new JobRoute(app);

}
