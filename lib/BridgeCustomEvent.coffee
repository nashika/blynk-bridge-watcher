BridgeBuiltInEvent = require './BridgeBuiltInEvent'

class BridgeCustomEvent extends BridgeBuiltInEvent

  ###*
  # @override
  ###
  constructor: (parent, config, index) ->
    super parent, config, index

module.exports = BridgeCustomEvent
