// Generated by CoffeeScript 1.10.0
(function() {
  var BuiltInEventBridge, PingBridge, util,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  util = require('util');

  PingBridge = require('./PingBridge');

  BuiltInEventBridge = (function(superClass) {
    extend(BuiltInEventBridge, superClass);


    /**
     * @override
     */

    function BuiltInEventBridge(parent, config, index) {
      this._onIf = bind(this._onIf, this);
      this._onWrite = bind(this._onWrite, this);
      this._onRead = bind(this._onRead, this);
      this._onNotify = bind(this._onNotify, this);
      BuiltInEventBridge.__super__.constructor.call(this, parent, config, index);
      this.on('$notify', this._onNotify);
      this.on('$n', this._onNotify);
      this.on('$read', this._onRead);
      this.on('$r', this._onRead);
      this.on('$write', this._onWrite);
      this.on('$w', this._onWrite);
      this.on('$if', this._onIf);
    }

    BuiltInEventBridge.prototype._onNotify = function() {
      var args, options, ref;
      options = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      return (ref = this.parent).notify.apply(ref, [options].concat(slice.call(args)));
    };

    BuiltInEventBridge.prototype._onRead = function() {
      var args, options;
      options = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    };

    BuiltInEventBridge.prototype._onWrite = function() {
      var args, options;
      options = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    };

    BuiltInEventBridge.prototype._onIf = function() {
      var args, options;
      options = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    };

    return BuiltInEventBridge;

  })(PingBridge);

  module.exports = BuiltInEventBridge;

}).call(this);

//# sourceMappingURL=BuiltInEventBridge.js.map