import "font-awesome/css/font-awesome.css";
import "./scss/style.scss";

import "core-js";

import "./inversify.config";
import {kernel} from "../common/inversify.config";
import {SocketIoClientService} from "./service/socket-io-client-service";

let AppComponent = kernel.getNamed("Newable<Component>", "app");
let app = new (<any>AppComponent)({el: "#app"});
app;

let socketIoClientService = kernel.get(SocketIoClientService);
socketIoClientService.initialize();
