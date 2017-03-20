import Vue = require("vue");
import _ = require("lodash");
import {LoDashStatic} from "lodash";

export class BaseComponent extends Vue {

  lodash: LoDashStatic = _;

}
