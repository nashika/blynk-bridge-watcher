Base = require '../Base'
NotifyEvent = require './NotifyEvent'
CustomEvent = require './CustomEvent'

class EventGenerator extends Base

  ###*
  # @override
  ###
  TYPE: 'EventGenerator'

  constructor: (parent) ->
    config =
      name: 'generator'
    super parent, config, -1

  generate: (parent, config, index) =>
    @checkConfig config.event, 'config.event', 'string'
    switch config.event
      when '$notify'
        return new NotifyEvent(parent, config, index)
      else
        if config.event.match(/$\$/)
          @log 'fatal', "Event '#{config.event}' is not defined built-in event."
          process.exit 1
        else
          return new CustomEvent(parent, config, index)

module.exports = EventGenerator
