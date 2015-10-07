BuiltInEventBridge = require './BuiltInEventBridge'
EventGenerator = require '../events/EventGenerator'

class CustomEventBridge extends BuiltInEventBridge

  ###*
  # @protected
  # @type {Object.<Event>
  ###
  _events2: null

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    @_events2 = {}
    i = 0
    if config.events
      eventGenerator = new EventGenerator(this)
      @checkConfig config.events, 'config.events', 'array'
      @log 'debug', "Construct event objects was started."
      for eventConfig in config.events
        @_events2[eventConfig.name] = eventGenerator.generate(this, eventConfig, i)
        @on eventConfig.name, @_events2[eventConfig.name].run
      @log 'debug', "Construct event objects was finished."

module.exports = CustomEventBridge
