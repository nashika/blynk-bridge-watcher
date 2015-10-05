BridgeBuiltInEvent = require './BridgeBuiltInEvent'

class BridgeCustomEvent extends BridgeBuiltInEvent

  ###*
  # @override
  ###
  constructor: (board, config, vPin) ->
    super board, config, vPin

module.exports = BridgeCustomEvent
