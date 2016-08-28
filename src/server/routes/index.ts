import express = require("express");
import {Express} from "express";

import {IndexRoute} from "./index-route";
import {ServerRoute} from "./server-route";
import {BoardRoute} from "./board-route";

export function routes(app:Express) {

  new IndexRoute(app);
  new ServerRoute(app);
  new BoardRoute(app);

}
