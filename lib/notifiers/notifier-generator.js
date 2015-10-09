// Generated by CoffeeScript 1.10.0
(function() {
  var Base, LogNotifier, NotifierGenerator, PushbulletNotifier,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Base = require('../base');

  LogNotifier = require('./log-notifier');

  PushbulletNotifier = require('./pushbullet-notifier');

  NotifierGenerator = (function(superClass) {
    extend(NotifierGenerator, superClass);


    /**
     * @override
     */

    NotifierGenerator.prototype.TYPE = 'NotifierGenerator';


    /**
     * @override
     */

    function NotifierGenerator(parent) {
      this.generate = bind(this.generate, this);
      var config;
      config = {
        name: 'generator'
      };
      NotifierGenerator.__super__.constructor.call(this, parent, config, -1);
    }

    NotifierGenerator.prototype.generate = function(parent, config, index) {
      this.checkConfig(config.type, 'config.type', 'string');
      switch (config.type) {
        case 'log':
          return new LogNotifier(parent, config, index);
        case 'pushbullet':
          return new PushbulletNotifier(parent, config, index);
        default:
          this.log('fatal', "Notifier type '" + config.type + "' is not defined.");
          return process.exit(1);
      }
    };

    return NotifierGenerator;

  })(Base);

  module.exports = NotifierGenerator;

}).call(this);

//# sourceMappingURL=notifier-generator.js.map