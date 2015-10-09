Base = require '../base'
LogNotifier = require './log-notifier'
PushbulletNotifier = require './pushbullet-notifier'

class NotifierGenerator extends Base

  ###*
  # @override
  ###
  TYPE: 'NotifierGenerator'

  ###*
  # @override
  ###
  constructor: (parent) ->
    config =
      name: 'generator'
    super parent, config, -1

  generate: (parent, config, index) =>
    type = @_checkConfig config, 'type', 'string'
    switch type
      when 'log'
        return new LogNotifier(parent, config, index)
      when 'pushbullet'
        return new PushbulletNotifier(parent, config, index)
      else
        @log 'fatal', "Notifier type '#{type}' is not defined."
        process.exit 1

module.exports = NotifierGenerator
