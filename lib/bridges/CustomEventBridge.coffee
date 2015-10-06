BuiltInEventBridge = require './BuiltInEventBridge'

class CustomEventBridge extends BuiltInEventBridge

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index

module.exports = CustomEventBridge
