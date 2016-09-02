import "font-awesome/css/font-awesome.css";
import "./scss/style.scss";

import "core-js";

import {AppComponent} from "./component/app-component";
import {serviceRegistry} from "./service/service-registry";

serviceRegistry.socketIo.initialize();

let app:AppComponent = new (<any>AppComponent)({el: "#app"});
