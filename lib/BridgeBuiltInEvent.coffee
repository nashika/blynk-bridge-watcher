BridgePing = require './BridgePing'

class BridgeBuiltInEvent extends BridgePing

  ###*
  # @override
  ###
  constructor: (board, config, vPin) ->
    super board, config, vPin
    @on '$log', @_onLog

  _onLog: (message) =>
    @log 'info', message

module.exports = BridgeBuiltInEvent
