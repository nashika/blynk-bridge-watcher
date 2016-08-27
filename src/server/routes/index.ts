import express = require("express");
import {Express} from "express";

import {IndexRoute} from "./index-route";

export function routes(app:Express) {

  let indexRoute = new IndexRoute(app);

}
