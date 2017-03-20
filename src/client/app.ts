import "font-awesome/css/font-awesome.css";
import "./scss/style.scss";

import "core-js";

import "./inversify.config";
import {container} from "../common/inversify.config";
import {SocketIoClientService} from "./service/socket-io-client-service";

let AppComponent = container.getNamed("Newable<Component>", "app");
let app = new (<any>AppComponent)({el: "#app"});
app;

let socketIoClientService = container.get(SocketIoClientService);
socketIoClientService.initialize();
