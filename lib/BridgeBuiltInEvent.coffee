BridgePing = require './BridgePing'

class BridgeBuiltInEvent extends BridgePing

  ###*
  # @override
  ###
  constructor: (board, config, vPin) ->
    super board, config, vPin
    @on '$log', @_onLog
    @on '$pushbullet', @_onPushbullet

  _onLog: (message) =>
    @log 'info', message

  _onPushbullet: (message) =>
    

module.exports = BridgeBuiltInEvent
