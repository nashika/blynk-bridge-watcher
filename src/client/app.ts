import "font-awesome/css/font-awesome.css";
import "./scss/style.scss";

import "core-js";
import "reflect-metadata";

import "./inversify.config";
import Vue = require("vue");
//import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";

//Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.component("node-component", require("./component/node-component.vue"));
Vue.component("boolean-input-component", require("./component/input/boolean-input-component.vue"));
Vue.component("node-input-component",  require("./component/input/node-input-component.vue"));
Vue.component("number-input-component",  require("./component/input/number-input-component.vue"));
Vue.component("select-input-component", require("./component/input/select-input-component.vue"));
Vue.component("text-input-component",  require("./component/input/text-input-component.vue"));
Vue.component("edit-modal-component", require("./component/modal/edit-modal-component.vue"));
Vue.component("logs-modal-component", require("./component/modal/logs-modal-component.vue"));
Vue.component("server-node-content-component", require("./component/node-content/server-node-content-component.vue"));
Vue.component("board-node-content-component", require("./component/node-content/board-node-content-component.vue"));
Vue.component("job-node-content-component", require("./component/node-content/job-node-content-component.vue"));
Vue.component("bridge-node-content-component", require("./component/node-content/bridge-node-content-component.vue"));
Vue.component("if-widget-node-content-component", require("./component/node-content/widget/if-widget-node-content-component.vue"));
Vue.component("read-widget-node-content-component", require("./component/node-content/widget/read-widget-node-content-component.vue"));
Vue.component("write-widget-node-content-component", require("./component/node-content/widget/write-widget-node-content-component.vue"));
Vue.component("log-notifier-node-content-component", require("./component/node-content/notifier/log-notifier-node-content-component.vue"));
Vue.component("pushbullet-notifier-node-content-component", require("./component/node-content/notifier/pushbullet-notifier-node-content-component.vue"));

let AppComponent = require("./component/app-component.vue");
new (<any>AppComponent)().$mount("#app");
