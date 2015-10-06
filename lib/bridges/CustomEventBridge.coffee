BuiltInEventBridge = require './BuiltInEventBridge'

class CustomEventBridge extends BuiltInEventBridge

  ###*
  # @protected
  # @type {Object.<Event>
  ###
  _events: null

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index
    if config.events
      @checkConfig config.events, 'config.events', 'array'
      @log 'debug', "Construct event objects was started."
      @log 'debug', "Construct event objects was finished."

module.exports = CustomEventBridge
